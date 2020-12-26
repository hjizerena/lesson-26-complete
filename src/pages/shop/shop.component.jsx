import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import CollectionPage from '../collection/collection.component';
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import {selectIsCollectionFetching, selectIsCollectionsLoaded} from "../../redux/shop/shop.selectors";
import {createStructuredSelector} from "reselect";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";
import {fetchCollectionsStart} from "../../redux/shop/shop.actions";

const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  componentDidMount() {
    const {fetchCollectionsStart} = this.props;
    fetchCollectionsStart();
  }

  render() {
    const {match} = this.props;
    return (
        <div className='shop-page'>
          <Route
              exact
              path={`${match.path}`}
              component={CollectionsOverviewContainer}
          />
          <Route
              path={`${match.path}/:collectionId`}
              component={CollectionPageContainer}
          />
        </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
