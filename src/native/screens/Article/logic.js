import React, {Component} from "react";
import {connect} from "react-redux"
import {compose} from 'redux';
import isLoading from "../../../hocs/isLoading";
import {getArticle} from "../../../actions/articles";
import { withNamespaces } from "react-i18next";
import {Actions} from "react-native-router-flux";

export default (WrapperComponent) => {
    class Logic extends Component {
        constructor(props) {
            super(props)
            this.state = {
                loaded: false
            }
        }

        componentDidMount() {
            const { navigation, dispatch } = this.props;
            dispatch(getArticle(navigation.state.params._id)).then(() => this.setState({ loaded: true }));
        };
        getChangeArticle = ({ _id }) => async () => {
            const {dispatch } = this.props;
            this.setState({ loaded: false })
            await dispatch(getArticle(_id));
            this.setState({ loaded: true })
        }
        render() {
            const {article: currentArticle = {}, articles = []} = this.props;
            const currentArticleIndex = articles.findIndex((article) => article._id === currentArticle._id);
            const articleNavigation = {}
            if (articles.length > 1){
                if (currentArticleIndex + 1 !== articles.length) {
                    articleNavigation.next = this.getChangeArticle(articles[currentArticleIndex + 1]);
                }

                if (currentArticleIndex > 0) {
                    articleNavigation.prev = this.getChangeArticle(articles[currentArticleIndex - 1])
                }
            }

            return <WrapperComponent
                state={this.state}
                articleNavigation={articleNavigation}
                {...this.props}/>
        }
    }

    return compose(
        isLoading({
            status_path: ({ status }) => ({ status: status.article }),
        }),
        withNamespaces(["app_articles"]),
        connect(({ articles, article }) => ({ articles, article }))
    )(Logic)
}
