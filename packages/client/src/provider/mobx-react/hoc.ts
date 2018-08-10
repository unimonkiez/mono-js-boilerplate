import { inject as MobxInject, observer as MobxObserver } from 'mobx-react';
import { Store } from '../../store';

type mapFnType = (store: Store) => any;

export default (
  (mapFn: mapFnType) => WrappedComponent => (
    MobxInject((mobxContextWrap: {store: Store }) => (
      mapFn(mobxContextWrap.store)
    ))(
      MobxObserver(WrappedComponent),
    )
  )
);
