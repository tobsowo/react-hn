/** @jsx React.DOM */

'use strict';

var React = require('react')

var CommentMixin = require('./mixins/CommentMixin')

var cx = require('./utils/buildClassName')

/**
 * Displays a standalone comment passed as a prop.
 */
var DisplayComment = React.createClass({
  mixins: [CommentMixin],

  propTypes: {
    comment: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      op: {}
    , parent: {type: 'comment'}
    }
  },

  componentWillMount: function() {
    this.fetchAncestors(this.props.comment)
  },

  render: function() {
    if (this.props.comment.deleted) { return null }

    var comment = this.props.comment
    var className = cx('Comment Comment--level0', {
      'Comment--dead': comment.dead
    })

    return <div className={className}>
      <div className="Comment__content">
        {this.renderCommentMeta(comment, {
          link: true
        , parent: !!this.state.parent.id && !!this.state.op.id && comment.parent != this.state.op.id
        , op: !!this.state.op.id
        })}
        {this.renderCommentText(comment)}
      </div>
    </div>
  }
})

module.exports = DisplayComment