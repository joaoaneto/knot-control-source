import tape from 'tape';
import around from 'tape-around';
import sinon from 'sinon';
import SettingsService from 'services/SettingsService';
import Credentials from 'entities/Credentials';

const test = around(tape)
  .before((t) => {
    const isReadyInteractor = {
      execute: sinon.stub().resolves(true),
    };
    const setUserInteractor = {
      execute: sinon.stub().resolves(new Credentials('hash-uuid', 'hash-token')),
    };
    const settingsService = new SettingsService(isReadyInteractor, setUserInteractor);
    t.next(settingsService);
  });

test('isReady() calls IsReadyInteractor.execute()', async (t, settingsService) => {
  await settingsService.isReady();

  t.true(settingsService.isReadyInteractor.execute.called);
  t.end();
});

test('setUser() calls setUserInteractor.execute()', async (t, settingsService) => {
  await settingsService.setUser();

  t.true(settingsService.setUserInteractor.execute.called);
  t.end();
});
