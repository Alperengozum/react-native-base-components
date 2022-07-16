import React, {ReactNode} from "react";
import {Button, Center,Heading,Modal, Text} from "native-base";
import {checkVersion, CheckVersionOptions, CheckVersionResponse} from "react-native-check-version";
import {getStorage, removeStorage, setStorage} from "./asyncStorageFunctions";
import DeviceInfo from 'react-native-device-info';
import {Linking, Platform} from "react-native";

export default class UpdateVersionModal extends React.PureComponent<Props, State> {

  public state: State = new State();

  private readonly key: string = "@616C706572656E676F7A756D";

  constructor(props: Props) {
    super(props);
    this.fetchVersion();
  }

  public render(): any {
    const {isOpen, maxWidth, hideCloseButton, customBody, customFooter,
      customHeader,preventClose} = this.props;
    const {isOpenController,version,checker} = this.state;

    return (
      (checker && version?.needsUpdate &&
        <Modal
          isOpen={isOpen || isOpenController}
          onClose={this.onCloseModal}
          {...this.props}

        >
          <Modal.Content maxWidth={maxWidth} minWidth={"90%"}>
            {!hideCloseButton && !preventClose && <Modal.CloseButton/>}
            <Modal.Body>
              <Center>
                {customHeader != undefined ? customHeader :
                  <Heading textAlign="center">Needs update</Heading>}
                {customBody != undefined ? customBody :
                  <React.Fragment>
                    <Text mt={10} textAlign="center">Version <Text bold>{version.version}</Text>  is out!</Text>
                    <Text mt={10} textAlign="center">Please update the app for the best performance and new features</Text>
                  </React.Fragment>
                }
                {customFooter != undefined ? customFooter :
                  <React.Fragment>
                    <Button mt={10} minW={"100%"} onPress={()=>{
                      Linking.openURL(version.url)}
                    }>{Platform.OS=="android" ? " Update on Google Play Store" : "Update on App Store"}</Button>
                  </React.Fragment>
                }
              </Center>
            </Modal.Body>
          </Modal.Content>
        </Modal>) || <React.Fragment/>
    )
  }

  private onCloseModal = async (): Promise<void> => {
    const {preventClose, onClose, showOnce} = this.props

    if(preventClose) return
    if (onClose) {
      onClose();
    } else {
      this.onCloseController()
    }
    if(showOnce){
      await this.onCloseForStorage(this.key)
    }
  }

  private fetchVersion = async () : Promise<void> => {
    const {checkVersionOptions, showOnce} = this.props;
    const version = await checkVersion(checkVersionOptions);
    let val= true
    if(showOnce){
      val = await this.isThatFirstStart(this.key, version);
    }
    this.setState({checker:val,version})
  }

  private isThatFirstStart = async (key: string, version:CheckVersionResponse ): Promise<boolean> => {
    const checker = await getStorage(key);

    if(version.version == undefined) return false
    if(checker==undefined) return true
    return checker.currentVersion != this.getCurrentVersion();
  }

  private getCurrentVersion =  () : string =>{
    const {checkVersionOptions} = this.props;
    return checkVersionOptions?.currentVersion || DeviceInfo.getVersion();
  }

  private onCloseForStorage = async (key: string): Promise<void> => {
    const {version} = this.state;
    await setStorage(key, {
      value:true,
      version,
      currentVersion: this.getCurrentVersion()
    })
  }

  private onCloseController = (): void  => {
    this.setState({isOpenController: false})
  }
}

interface Props {
  isOpen?: boolean
  onClose?: () => void
  maxWidth?: string
  hideCloseButton?: boolean
  customBody?: ReactNode | string
  customFooter?: ReactNode | string
  customHeader?: ReactNode | string
  checkVersionOptions?: CheckVersionOptions
  showOnce?: boolean
  preventClose?: boolean
}

class State {
  version: CheckVersionResponse | undefined;
  checker: boolean = false
  isOpenController: boolean = true;
}
