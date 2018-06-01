import Base from './base';

class Review extends Base {
  constructor(props) {
    super(props);
    const accounts = JSON.parse(localStorage.getItem('octodash-accounts'));
    // TODO: this fails if the user has no repos
    // TODO: also, what we really want here is a second list: users/orgs to watch for
    // this.queries = accounts.map(account => `is:open is:pr archived:false -assignee:${account.name} -author:${account.name} user:${account.name}&access_token=${account.token}`);
    this.queries = accounts.map(account => `is:open is:pr archived:false -assignee:${account.name} -author:${account.name} mentions:${account.name}&access_token=${account.token}`);
  }
}

export default Review;
