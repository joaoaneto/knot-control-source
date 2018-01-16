import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import SetUserInteractor from 'interactors/SetUserInteractor';
import State from 'entities/State';
import Credentials from 'entities/Credentials';
import InvalidStateError from 'entities/InvalidStateError';

const test = around(tape)
  .before((t) => {
    const settingsStore = {
      getState: sinon.stub().resolves(State.CONFIGURATION),
      setUser: sinon.stub().resolves(),
    };
    t.next(settingsStore);
  });

test('calls setUser() on store', async (t, settingsStore) => {
  const interactor = new SetUserInteractor(settingsStore);
  const userCredentials = new Credentials('hash-uuid', 'hash-token');

  await interactor.execute(userCredentials);

  t.true(settingsStore.setUser.called);
  t.end();
});

test('calls setUser() on store with new credentials', async (t, settingsStore) => {
  const interactor = new SetUserInteractor(settingsStore);
  const userCredentials = new Credentials('hash-uuid', 'hash-token');

  await interactor.execute(userCredentials);

  const actualUserCredentials = settingsStore.setUser.getCall(0).args[0];
  t.deepEqual(actualUserCredentials, userCredentials);
  t.end();
});

test('throws InvalidStateError when state is READY', async (t, settingsStore) => {
  settingsStore.getState.resolves(State.READY);
  const interactor = new SetUserInteractor(settingsStore);
  const userCredentials = new Credentials('hash-uuid', 'hash-token');

  try {
    await interactor.execute(userCredentials);
    t.fail('should throw');
  } catch (e) {
    t.true(e instanceof InvalidStateError);
  }
  t.end();
});
