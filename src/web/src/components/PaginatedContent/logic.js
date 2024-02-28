import React, {} from 'react'
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import store from 'store'
import qs from "qs";

export default (WrappedComponent) => {
    class Logic extends React.Component {
        state = {
            items: [],
            loading: true,
            limit: 0
        };

        toPage = (page) => {
            const {location, history} = this.props;
            const query = qs.parse(location.search.replace("?",""));
            const newQuery = qs.stringify({...query, ...{page}});
            history.push(`${location.pathname}?${newQuery}`);
        };

        updatePage = async ({query} = {}) => {
            const {fetchItems, location,  limit = 10, pages} = this.props;
            if(!query) query = location.search;
            const parsed_query = qs.parse(query.replace("?",""));
            const {tags = [], ranges = {}, page} = parsed_query;
            this.setState({loading: true});
            const {count = 10} = await fetchItems({tags, page: page - 1, limit, replace: true});
            console.log("PROPS PAGES", pages);
            if(pages){
                this.setState({pages: Math.floor(count/limit), loading: false});
            } else {
                this.setState({loading: false});
            }
        };

        async componentDidMount(){
            this.updatePage();
        }

        async componentDidUpdate(prevProps){
            const {fetchItems, location: {search: current_query}, limit = 10} = this.props;
            const {location: {search: prev_query}} = prevProps;
            const {page: current_page} = qs.parse(current_query.replace("?",""));
            const {page: prev_page} = qs.parse(prev_query.replace("?",""));
            if(current_page !== prev_page) {
                this.updatePage({query: current_query});
            }
        }

        render() {
            const {location} = this.props;
            const query = qs.parse(location.search.replace("?",""));
            const currentPage = query.page ? parseInt(query.page) : 1;
            const pages = this.props.pages ? this.props.pages : this.state.pages;
            return <WrappedComponent
                    {...this.props}
                    pages = {pages}
                    current = {currentPage}
                    toPage = {this.toPage}
                    loading = {this.state.loading}
            />
        }
    }
    return compose(
        withRouter
    )(Logic)
}
