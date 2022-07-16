import React, {ReactNode} from "react";
import {Center, Heading, Modal, ScrollView, Text} from "native-base";
import {CheckVersionOptions, CheckVersionResponse} from "react-native-check-version";
import {getStorage, removeStorage, setStorage} from "./asyncStorageFunctions";
import DeviceInfo from 'react-native-device-info';

export default class ChangelogModal extends React.PureComponent<Props, State> {

  public state: State = new State();

  private readonly key: string = "@011000010110110001110000011001010111001001100101011011100110011101101111011110100111010101101101";

  constructor(props: Props) {
    super(props);
    (async () => {
      await this.fetchVersion();
    })();
  }

  public render(): any {
    const {isOpen, maxWidth, hideCloseButton, customBody, customFooter,
      customHeader,preventClose,text} = this.props;
    const {isOpenController,checker} = this.state;

    return (
      (checker &&
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
                  <React.Fragment>
                    <Heading textAlign="center">Changelog</Heading>
                    <Text textAlign="center">Version <Text bold>{this.getCurrentVersion()}</Text></Text>
                  </React.Fragment>
                }
                {text != undefined ? this.renderText(text) : <></>}
                {customBody != undefined ? customBody :
                  <React.Fragment>
                  </React.Fragment>
                }
                {customFooter != undefined ? customFooter :
                  <React.Fragment>
                  </React.Fragment>
                }
              </Center>
            </Modal.Body>
          </Modal.Content>
        </Modal>) || <React.Fragment/>
    )
  }

  private renderText = (text: string | Array<string>): ReactNode => {
    if(typeof text == "string")
      return (<ScrollView>
      <Text textAlign={"center"}>{text}</Text>
    </ScrollView>)

    return <ScrollView>
      {text.map((t,i)=> (

        <Text key={t+i} textAlign={"center"}><Text bold>{i+1} -</Text> {t}</Text>))}
    </ScrollView>
  }

  private onCloseModal = async (): Promise<void> => {
    const {preventClose, onClose, showOnce} = this.props

    if(preventClose) return
    if (onClose) {
      onClose();
    } else {this.onCloseController()}
    if(showOnce != false){await this.onCloseForStorage(this.key)}
  }

  private fetchVersion = async () : Promise<void> => {
    const {showOnce} = this.props;
    let val= true
    if(showOnce!= false){val = await this.isThatFirstStart(this.key);}
    this.setState({checker:val})
  }

  private isThatFirstStart = async (key: string): Promise<boolean> => {
    const {requestedVersion} = this.props;
    const checker = await getStorage(key);

    return checker == undefined && this.getCurrentVersion() == requestedVersion;
  }

  private getCurrentVersion =  () : string =>{
    const {checkVersionOptions} = this.props;
    return checkVersionOptions?.currentVersion || DeviceInfo.getVersion();
  }

  private onCloseForStorage = async (key: string): Promise<void> => {
    await setStorage(key, {
      value:true,
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
  requestedVersion: string
  text: string | Array<string>
}

class State {
  version: CheckVersionResponse | undefined;
  checker: boolean = false
  isOpenController: boolean = true;
}
