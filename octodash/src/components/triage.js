import Base from './base';

class Triage extends Base {
  constructor(props) {
    super(props);
    const accounts = JSON.parse(localStorage.getItem('octodash-accounts')) || [];
    // TODO: what we really want here is a different list: users/orgs to watch for
    this.queries = accounts.map(account => `is:open is:issue archived:false -assignee:${account.name} user:${account.name}&access_token=${account.token}`);
  }
}

export default Triage;
