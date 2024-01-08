import { exec } from 'node:child_process';

class Command {
  trimResponse = true;

  prefix = null;

  async execute(command) {
    return new Promise((resolve, reject) => {
      exec(
        this.prefix ? `${this.prefix} ${command}` : command,
        // eslint-disable-next-line complexity
        (err, stdout, stderr) => {
          if (err) {
            return reject(err || new Error(stderr));
          }

          return resolve(this.trimResponse ? stdout.trim() : stdout);
        }
      );
    });
  }
}

export class Git extends Command {
  prefix = 'git';

  async getLastTag(packageName) {
    let command =
      "for-each-ref --sort=creatordate --format '%(refname) %(creatordate)' refs/tags";

    if (packageName) {
      command += ` | grep ${packageName}`;
    }

    return this.execute(`${command} | tail -1`).then((tag) =>
      tag ? tag.split(' ')[0].slice(10) : null
    );
  }

  async getLastAnyTag() {
    return this.getLastTag();
  }

  async getLastAnyTagLegacy() {
    return this.execute('describe --tags --abbrev=0');
  }

  async isTagExists(packageName, packageVersion) {
    return this.execute(
      `show-ref --tags --verify --quiet refs/tags/${packageName}-v${packageVersion}`
    )
      .then(() => true)
      .catch(() => false);
  }

  async createTag(tagName, commitHash = '') {
    return this.execute(`tag ${tagName} ${commitHash}`);
  }

  async pushTag(tagName) {
    return this.execute(`push origin ${tagName}`);
  }

  async getCommitsSinceLastTag(projectLastTag, packageName) {
    return (
      await this.execute(
        `log ${projectLastTag}..HEAD --grep ${packageName} --pretty=format:'%s (%H)'`
      )
    ).split('\n');
  }
}

export class NPM extends Command {
  prefix = 'npm';

  async publish() {
    return this.execute('publish');
  }
}

export class CurlRequest extends Command {
  prefix = 'curl';

  async request(method, url, headers = {}, body = null) {
    let command = `-L \\\n-X ${method} \\\n`;

    Object.entries(headers).forEach(([key, value]) => {
      command += `-H "${key}: ${value}" \\\n`;
    });

    command += `${url} \\\n`;

    if (body) {
      command += `-d ${
        typeof body === 'object'
          ? `'${JSON.stringify(body)}'`
          : typeof body === 'string'
            ? `'${body}'`
            : '{}'
      }`;
    }

    return this.execute(command);
  }

  async post(url, headers, body) {
    return this.request('POST', url, headers, body);
  }
}
