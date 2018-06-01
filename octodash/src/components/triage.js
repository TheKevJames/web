import Base from './base';

class Triage extends Base {
  constructor(props) {
    super(props);
    // const accounts = JSON.parse(localStorage.getItem('octodash-accounts'));
    // TODO: this fails if the user has no repos
    // TODO: also, what we really want here is a second list: users/orgs to watch for
    // this.queries = accounts.map(account => `is:open is:issue archived:false -assignee:${account.name} user:${account.name}&access_token=${account.token}`);
    this.queries = [];
  }
}

export default Triage;
