import Dictionary from 'ima/dictionary/Dictionary';
import Dispatcher from 'ima/event/Dispatcher';
import EventBus from 'ima/event/EventBus';
import Router from 'ima/router/Router';
import Window from 'ima/window/Window';

//eslint-disable-next-line no-unused-vars
export default (ns, oc, config) => {
  //COMPONENT Utils
  oc.constant('$Utils', {
    $Router: oc.get(Router),
    $Dispatcher: oc.get(Dispatcher),
    $EventBus: oc.get(EventBus),
    $Dictionary: oc.get(Dictionary),
    $Settings: oc.get('$Settings'),
    $Window: oc.get(Window),
    $CssClasses: oc.get('$CssClasses')
  });
};
