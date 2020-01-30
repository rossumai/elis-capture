import { Action } from 'redux';
import { combineEpics, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap, pluck } from 'rxjs/operators';
import { authPost, errorHandler } from '../../../lib/api';
import { CapturedPicture } from './../../../components/Camera/index';
import { State } from './reducer';

export const UPLOAD_DOCUMENTS = 'UPLOAD_DOCUMENTS';
export const UPLOAD_DOCUMENTS_FULFILLED = 'UPLOAD_DOCUMENTS_FULFILLED';

export const uploadDocuments = (files: CapturedPicture[]) => ({
  type: UPLOAD_DOCUMENTS,
  payload: { files },
});

export const uploadDocumentsFulffilled = () => ({
  type: UPLOAD_DOCUMENTS_FULFILLED,
});

const uploadDocumentsEpic = (action$: Observable<Action>, state: State) =>
  action$.pipe(
    ofType(UPLOAD_DOCUMENTS),
    pluck('payload', 'files'),
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
      } = state.value;
      const { url } = queues[currentQueueIndex];

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

export default combineEpics(uploadDocumentsEpic);
