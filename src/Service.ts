import Commit from './models/Commit';
import Repository from './models/Repository';

const URL_BASE = 'https://api.github.com';
const CLIENT_ID = 'ffd682caab6b6c6b8ffe';
const KEY = '';
const mock = true;

class Service {
    getRepo(repoFullName: string): Promise<Repository> {
        const relUrl = `/repos/${repoFullName}?client_id=${CLIENT_ID}&client_secret=${KEY}`;

        if (mock) {
            var id = Math.random().toString();
            id = id.substring(2, id.length - 1);

            const repo: Repository = {
                fullName: repoFullName,
                name: repoFullName,
                url: `https://api.github.com/repos/${repoFullName}`,
                id: id,
                description: 'mock description'
            };

            return new Promise((resolve, reject) => {
                setTimeout(() => { resolve(repo); }, getRandomNumber(50, 1000));
            });
        } else {
            return getFetch(relUrl)
                .then((res) => {
                    return res.json();
                })
                .then((rawRepo) => {
                    let repo: Repository = new Repository();
                    repo.id = rawRepo.id;
                    repo.name = rawRepo.name;
                    repo.description = rawRepo.description;
                    repo.fullName = rawRepo.full_name;
                    repo.url = rawRepo.url;

                    return new Promise<Repository>((resolve, reject) => {
                        resolve(repo);
                    });
                });
        }
    }

    getCommit(repoFullName: string, sha: string): Promise<Commit> {
        const relUrl = `/repos/${repoFullName}/commits/${sha}?client_id=${CLIENT_ID}&client_secret=${KEY}`;

        if (mock) {
            const additions = getRandomNumber(0, 250);
            const deletions = getRandomNumber(0, 250);
            const totalMods = additions + deletions;

            const commit: Commit = {
                sha: sha,
                authorName: 'Ville Piirainen',
                authorEmail: 'ville.piirainen@cgi.com',
                date: new Date(),
                message: 'Nice commit number ' + getRandomNumber(1, 1000),
                statsAssigned: true,
                additions: additions,
                deletions: deletions,
                totalModifications: totalMods
            };

            return new Promise((resolve, reject) => {
                setTimeout(() => { resolve(commit); }, getRandomNumber(50, 1000));
            });
        } else {
            return getFetch(relUrl)
                .then((res) => {
                    return res.json();
                })
                .then((rawCommit) => {
                    var commit: Commit = new Commit();
                    commit.authorName = rawCommit.commit.author.name;
                    commit.authorEmail = rawCommit.commit.author.email;
                    commit.date = new Date(rawCommit.commit.author.date);
                    commit.message = rawCommit.commit.message;
                    commit.sha = rawCommit.sha;
                    commit.additions = rawCommit.stats.additions;
                    commit.deletions = rawCommit.stats.deletions;
                    commit.totalModifications = rawCommit.stats.total;
                    commit.statsAssigned = true;

                    return new Promise<Commit>((resolve, reject) => {
                        resolve(commit);
                    });
                });
        }
    }

    getCommits(repoFullName: string): Promise<Array<Commit>> {
        const relUrl = `/repos/${repoFullName}/commits?client_id=${CLIENT_ID}&client_secret=${KEY}`;

        if (mock) {
            const commits: Array<Commit> = [{
                sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc1',
                authorName: 'Ville Piirainen',
                authorEmail: 'ville.piirainen@cgi.com',
                date: new Date(),
                message: 'Nice commit',
                statsAssigned: false
            }, {
                sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc2',
                authorName: 'Ville Piirainen',
                authorEmail: 'ville.piirainen@cgi.com',
                date: new Date(),
                message: 'Nice commit',
                statsAssigned: false

            }, {
                sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc3',
                authorName: 'Ville Piirainen',
                authorEmail: 'ville.piirainen@cgi.com',
                date: new Date(),
                message: 'Nice commit',
                statsAssigned: false

            }, {
                sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc4',
                authorName: 'Ville Piirainen',
                authorEmail: 'ville.piirainen@cgi.com',
                date: new Date(),
                message: 'Nice commit',
                statsAssigned: false

            }, {
                sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc5',
                authorName: 'Ville Piirainen',
                authorEmail: 'ville.piirainen@cgi.com',
                date: new Date(),
                message: 'Nice commit',
                statsAssigned: false

            }, {
                sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc6',
                authorName: 'Ville Piirainen',
                authorEmail: 'ville.piirainen@cgi.com',
                date: new Date(),
                message: 'Nice commit',
                statsAssigned: false

            }, {
                sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc7',
                authorName: 'Ville Piirainen',
                authorEmail: 'ville.piirainen@cgi.com',
                date: new Date(),
                message: 'Nice commit',
                statsAssigned: false

            }, {
                sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc8',
                authorName: 'Ville Piirainen',
                authorEmail: 'ville.piirainen@cgi.com',
                date: new Date(),
                message: 'Nice commit',
                statsAssigned: false

            }, {
                sha: '0b86ef4101ac90c79341f4eb94b2212ceac57dc9',
                authorName: 'Ville Piirainen',
                authorEmail: 'ville.piirainen@cgi.com',
                date: new Date(),
                message: 'Nice commit',
                statsAssigned: false

            }];

            return new Promise((resolve, reject) => {
                setTimeout(() => { resolve(commits); }, getRandomNumber(50, 1000));
            });
        } else {
            return getFetch(relUrl)
                .then((res) => {
                    return res.json();
                })
                .then((rawCommits) => {
                    let commits = rawCommits.map((rawCommit: any) => {
                        var commit: Commit = new Commit();
                        commit.authorName = rawCommit.commit.author.name;
                        commit.authorEmail = rawCommit.commit.author.email;
                        commit.date = new Date(rawCommit.commit.author.date);
                        commit.message = rawCommit.commit.message;
                        commit.sha = rawCommit.sha;
                        return commit;
                    });
                    return new Promise<Array<Commit>>((resolve, reject) => {
                        resolve(commits);
                    });
                });
        }
    }
}

function getRandomNumber(low: number, high: number) {
    return Math.floor(Math.random() * high) + low;
}

function getFetch(relativeUrl: string, httpHeaders: Headers = new Headers()) {
    const defaultHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    /* Add default headers */
    for (var header in defaultHeaders) {
        if (!httpHeaders.hasOwnProperty(header)) {
            httpHeaders[header] = defaultHeaders[header];
        }
    }

    const reqSettings: RequestInit = {
        method: 'GET',
        headers: new Headers(httpHeaders),
        cache: 'default'
    };

    var req = new Request(`${URL_BASE}${relativeUrl}`, reqSettings);
    return fetch(req);
}

export default Service;