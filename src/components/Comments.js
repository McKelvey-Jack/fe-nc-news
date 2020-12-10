import React, { Component } from 'react';
import * as api from '../api';
import CommentVotes from './CommentVotes';
import DeleteComment from './DeleteComment';
import Loading from './Loading';
import NewComment from './NewComment';
import { getTimeAGo } from '../utils';
import ErrorMessage from './ErrorMessage';

export default class Comments extends Component {
  state = { comments: [], isLoading: true, isError: false, errorMessage: '' };

  componentDidMount() {
    api
      .getArticleComments(this.props.article_id)
      .then((comments) => {
        this.setState({ comments, isLoading: false });
      })
      .catch((err) => {
        const {
          response: { data },
        } = err;
        const {
          response: { status },
        } = err;
        this.setState({
          isError: true,
          isLoading: false,
          errorMessage: `${status} ${data.msg}`,
        });
      });
  }

  addComment = (newComment) => {
    this.setState((currstate) => {
      const newState = [...currstate.comments];
      newState.unshift(newComment);
      return { comments: newState };
    });
  };

  removeComment = (commentToDeleteId) => {
    this.setState((currstate) => {
      console.log(currstate);
      const UpdatedState = currstate.comments.filter((comment) => {
        return comment.comment_id !== commentToDeleteId;
      });
      return { comments: UpdatedState };
    });
  };

  render() {
    const { comments } = this.state;
    if (this.state.isLoading) {
      return <Loading />;
    } else if (this.state.isError) {
      return <ErrorMessage errorMessage={this.state.errorMessage} />;
    } else {
      return (
        <section>
          <NewComment
            article_id={this.props.article_id}
            addComment={this.addComment}
          />
          <p>{comments.length} comments</p>
          {comments.map((comment, index) => {
            const date = getTimeAGo(comment.created_at);
            return (
              <div className={'comments-container'} key={comment.comment_id}>
                <p>{comment.author} 💬</p>
                <p className={'comment-date'}>{date}</p>
                <p>{comment.body}</p>
                <CommentVotes
                  comment_id={comment.comment_id}
                  voteCount={comment.votes}
                />

                {comment.author === 'tickle122' ? (
                  <DeleteComment
                    comment_id={comment.comment_id}
                    removeComment={this.removeComment}
                  />
                ) : null}
              </div>
            );
          })}
        </section>
      );
    }
  }
}
