import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { catchError, map, mergeMap, pluck } from 'rxjs/operators';
import { authPost, errorHandler } from '../../../lib/api';
import { reduxStateT } from '../../configureStore';
import { CapturedPicture } from './../../../components/Camera/index';

export const UPLOAD_DOCUMENTS = 'UPLOAD_DOCUMENTS';
export const UPLOAD_DOCUMENTS_FULFILLED = 'UPLOAD_DOCUMENTS_FULFILLED';

type actionTypeT = 'UPLOAD_DOCUMENTS' | 'UPLOAD_DOCUMENTS_FULFILLED';

type ack<typeT extends actionTypeT, payloadT> = {
  type: typeT;
  payload: payloadT;
};

export type actionT =
  | ack<'UPLOAD_DOCUMENTS', { files: CapturedPicture[] }>
  | ack<'UPLOAD_DOCUMENTS_FULFILLED', {}>;

type uploadDocumentsT = (files: CapturedPicture[]) => actionT;
export const uploadDocuments: uploadDocumentsT = (files: CapturedPicture[]) => ({
  type: UPLOAD_DOCUMENTS,
  payload: { files },
});

type uploadDocumentsFulffilledT = () => actionT;
export const uploadDocumentsFulffilled: uploadDocumentsFulffilledT = () => ({
  type: UPLOAD_DOCUMENTS_FULFILLED,
  payload: {},
});

const uploadDocumentsEpic = (
  action$: ActionsObservable<actionT>,
  state$: StateObservable<reduxStateT>,
) =>
  action$.pipe(
    ofType(UPLOAD_DOCUMENTS),
    // @ts-ignore
    pluck('payload', 'files'), // the type inference for pluck seems to be not working, TODO possibly introduce custom pluck which infers the types
    map((files: CapturedPicture[]) =>
      files.map(file => ({
        uri: file.uri,
        name: `capture_${Date.now()}`,
        type: 'image/jpg',
      })),
    ),
    map((files: CapturedPicture[]) => {
      const {
        queues: { currentQueueIndex, queues },
      } = state$.value;
      const { url } = queues[currentQueueIndex ? currentQueueIndex : 0];
      const data = new FormData();
      files.forEach((file: CapturedPicture) => data.append('content', file));
      return [url, data];
    }),
    mergeMap(([url, data]) =>
      authPost(`${url}/upload?join=true`, data, {
        // eslint-disable-next-line no-undef
        'Content-Type': undefined,
      }).pipe(map(uploadDocumentsFulffilled), catchError(errorHandler)),
    ),
  );

export default uploadDocumentsEpic;
