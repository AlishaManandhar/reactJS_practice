import React, { Component } from "react";
import { getPosts } from "../services/fakeposts";
import Like from "./common/Like";
import Table from "./common/Table";
import Pagination from "./common/Pagination";
import { paginate } from "./../utils/paginate";
import _ from "lodash"

class Posts extends Component {
  state = {
    posts: [],
    pageSize: 6,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  columns = [
    { path: "title", label: "Title" },
    { path: "body", label: "Body" },
    {
      key: "Like",
      content: (post) => (
        <Like liked={post.liked} onClick={() => this.handleLike(post)} />
      ),
    },
    {
      key: "Delete",
      content: (post) => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() => this.handleDelete(post.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  handleLike = (post) => {
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index].liked = !posts[index].liked;
    this.setState({ posts });
  };

  handleDelete = (id) => {
    const posts = this.state.posts.filter((post) => post.id !== id);
    this.setState({ posts });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, posts: allPosts, sortColumn } = this.state;
    const sortedPosts = _.orderBy(
      allPosts,
      [sortColumn.path],
      [sortColumn.order]
    );
    return paginate(sortedPosts, currentPage, pageSize);
  };

  componentDidMount() {
    const posts = getPosts();
    this.setState({ posts });
  }

  render() {
    const { length: count } = this.state.posts;
    const { pageSize, currentPage, sortColumn } = this.state;
    const posts = this.getPagedData()

    if (count === 0) return <h2>There are no posts in database</h2>;
    return (
      <React.Fragment>
        <h2>Showing {count} posts from database</h2>
        <Table
          columns={this.columns}
          data={posts}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          itemsCount={count}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Posts;
