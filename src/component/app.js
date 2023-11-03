import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import TodoList from './TodoList';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    const { username, password } = userData;
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const authenticatedUser = storedUsers.find((u) => u.username === username && u.password === password);

    if (authenticatedUser) {
      setUser(authenticatedUser);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const protectedRoute = (Component) => {
    return user ? <Component user={user} /> : <Redirect to="/login" />;
  };

  return (
    <Router>
      <Switch>
        <Route path="/register" component={RegistrationForm} />
        <Route
          path="/login"
          render={() => (user ? <Redirect to="/todo" /> : <LoginForm onLogin={handleLogin} />)}
        />
        <Route
          path="/todo"
          render={() => protectedRoute(TodoList)}
        />
        <Route path="/logout" render={() => { handleLogout(); return <Redirect to="/login" />; }} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
