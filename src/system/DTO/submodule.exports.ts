import translation from './domain/translations';
import generateSubModuleConfiguration from '../CompositionRoot/domain/factories/generateSubModuleConfiguration';

const subModule = generateSubModuleConfiguration(
  [],
  [],
  [],
  translation,
);
export default subModule;
