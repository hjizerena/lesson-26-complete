import ShopActionTypes from "../../redux/shop/shop.types";
import {call, put, takeLatest, all} from 'redux-saga/effects';
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "../../redux/shop/shop.actions";

export function* fetchCollectionsAsync() {
  console.log('i am fired');
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (e) {
    yield put(fetchCollectionsFailure(e.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,
      fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([
      call(fetchCollectionsStart)
  ]);
}