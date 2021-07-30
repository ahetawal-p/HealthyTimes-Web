import { AppBar, Toolbar, Tabs, Tab } from '@material-ui/core';
import { Link, useLocation, Switch, Route } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';
import { FeedList } from '../Home';
import { BookmarksList } from '../Bookmark';

import './HeaderView.css';

const Header = () => {
  const location = useLocation();
  return (
    <AppBar position="static">
      <Toolbar className="header" variant="dense">
        <h1>
          <Link to="/">
            <Icon path={mdiHome} size={1} />
            Healthy Times Web
          </Link>
        </h1>
      </Toolbar>
      <Tabs value={location.pathname} variant="fullWidth">
        <Tab label="Feed List" component={Link} to={`/`} value={`/`} />
        <Tab label="Bookmarks" component={Link} to={`/bookmarks`} value={`/bookmarks`} />
      </Tabs>
      <Switch>
        <Route exact path="/">
          <div style={{ display: location.pathname === '/' ? 'block' : 'none' }}>
            <FeedList />
          </div>
        </Route>
        <Route path="/bookmarks">
          <div style={{ display: location.pathname === '/bookmarks' ? 'block' : 'none' }}>
            <BookmarksList />
          </div>
        </Route>
      </Switch>
    </AppBar>
  );
};
export default Header;
