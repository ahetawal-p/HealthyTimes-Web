import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState, useCallback } from 'react';
import { fakeApi as service } from '../../service';
import { CircularProgress, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { Virtuoso } from 'react-virtuoso';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // minHeight: '100vh',
    minWidth: '100vh',
    backgroundColor: theme.palette.background.paper,
    color: 'black'
  }
}));

const FeedList = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [listData, setListData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isEnd, setEnd] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    console.log('I am called now');
    try {
      const results = await service(pageNumber);
      const articles = results.articles;
      const newResults = results.totalResults;
      setListData((prevResults) => [...prevResults, ...articles]);
      setTotalPages(Math.ceil(newResults / 10));
      console.log(results);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [pageNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const loadMoreData = async () => {
    if (pageNumber < totalPages) {
      setPageNumber((prev) => prev + 1);
    } else {
      setEnd(true);
    }
  };

  const onArticleClick = (index, article) => {
    alert('I am called ' + index);
  };

  const Item = ({ index, article }) => {
    return (
      <ListItem button style={{ height: '60px' }} key={index} onClick={() => onArticleClick(index, article)}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText primary={`Item ${article.headline.main}`} />
      </ListItem>
    );
  };

  return (
    <div className={classes.root}>
      <Virtuoso
        style={{ height: '300px' }}
        endReached={loadMoreData}
        data={listData}
        itemContent={(index, article) => {
          return <Item index={index} article={article}></Item>;
        }}
        components={{
          Footer: () => {
            return isEnd ? null : (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
                <CircularProgress color="primary" size={24} />
              </div>
            );
          }
        }}
      />
    </div>
  );
};
export default FeedList;
