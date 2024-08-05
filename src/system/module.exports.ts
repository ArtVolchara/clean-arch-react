import addBrowserStorages from "./BrowserStorages/submodule.exports";
import IAppState from "./CompositionRoot/domain/entities/IAppState";
import addComposition from "./CompositionRoot/submodule.exports";
import addHttpRequesting from "./HttpRequest/submodule.exports";
import addInternalization from "./Internalization/submodule.exports";
import addLayouts from "./Layout/submodule.exports";
import addNavigation from "./Navigation/submodule.exports";
import addNotification from "./Notification/submodule.exports";
import addRendering from "./Rendering/submodule.exports";
import addUser from "./User/submodule.exports";
import addValidation from "./Validation/submodule.exports";

type IAddSystemModuleRequiredState = IAppState;

export function addSystemModule<const RequiredState extends IAddSystemModuleRequiredState = Record<string, never>>(appState: RequiredState) {
    return addUser(
        addHttpRequesting(
          addBrowserStorages(
            addValidation(
              addLayouts(
                addNotification(
                  addNavigation(
                    addInternalization(
                      addRendering(
                        addComposition(appState)
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      )
    }

