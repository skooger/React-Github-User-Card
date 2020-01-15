import React from 'react';
import axios from 'axios';
import './App.css';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardLink } from 'reactstrap';


class App extends React.Component {

  state = {
    userInfo : {},
    followers: []

  };

 componentDidMount() {
    axios
      .get('https://api.github.com/users/skooger')
      .then(res => {
        // res.data.message
        this.setState({
          userInfo: res.data
        });
        console.log(res);
      })
      .catch(err => console.log(err));

      axios
      .get('https://api.github.com/users/skooger/followers')
      .then(res => {
        // res.data.message
        this.setState({
         followers: res.data
        });
      })
      .catch(err => console.log(err));
  };


  render(){
    return (
      <div className="App">
       <div className="User-Container">
        <h2> Your User Info </h2>
          <Card>
            <CardBody>
              <CardTitle>{this.state.userInfo.login}</CardTitle>
              <CardSubtitle>{this.state.userInfo.bio}</CardSubtitle>
            </CardBody>
            <img width="100%" src={this.state.userInfo.avatar_url} alt="Card image cap" />
            <CardBody>
              <CardText>Followers: {this.state.userInfo.followers}</CardText>
              <CardLink href={this.state.userInfo.repos_url}>Repos</CardLink>
            </CardBody>
          </Card>
        </div>
        
        <div className="User-Container">
          <h2> Your Followers </h2>
          <div className="Follower-Container">
            {this.state.followers.map(follower => 
              <Card>
                <CardBody>
                  <CardTitle>{follower.login}</CardTitle>
                  <CardSubtitle>{follower.bio}</CardSubtitle>
                </CardBody>
                <img width="100%" src={follower.avatar_url} alt="Card image cap" />
                <CardBody>
                  <CardLink href={follower.repos_url}>Repos</CardLink>
                </CardBody>
            </Card>

            )}
          </div>
        </div>
      </div>
    );

  }
 
}

export default App;
