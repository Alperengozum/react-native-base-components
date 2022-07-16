import React, {ReactNode} from "react";
import {Center, Heading, Modal, Text} from "native-base";
import DiamondIcon from "./DiamondIcon";
import {getStorage, removeStorage, setStorage} from "./asyncStorageFunctions";

export default class FirstLaunchModal extends React.PureComponent<Props, State> {

  public state: State = new State();

  private readonly key: string = "@097108112101114101110103111122117109";

  constructor(props: Props) {
    super(props);
    (async () => {
      const val = await this.isThatFirstStart(this.key);
      this.setState({checker: val})
    })();
  }

  public render() {
    const {isOpen, maxWidth, hideCloseButton, customBody, customFooter, customHeader,preventClose} = this.props;
    const {checker, isOpenController} = this.state;

    return (
      checker &&
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
                <Heading textAlign="center">Welcome &#127881;</Heading>}
              {customBody != undefined ? customBody :
                <React.Fragment>
                  <DiamondIcon/>
                </React.Fragment>
              }
              {customFooter != undefined ? customFooter :
                <React.Fragment>
                  <Text textAlign="center">Thank you for installing app.</Text>
                </React.Fragment>
              }

            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal>)
  }
  public isThatFirstStart = async (key: string): Promise<boolean> => {
    const checker = await getStorage(key)

    switch (checker) {
      case "true":
        return false;
      case undefined:
        return true;
      default:
        return false;
    }
  }

  private onCloseModal = async (): Promise<void> => {
    const {preventClose, onClose} = this.props

    if(preventClose) return
    if (onClose) {onClose();
    } else {this.onCloseController()}
    await this.onCloseForStorage(this.key)
  }

  private onCloseForStorage = async (key: string): Promise<void> => {await setStorage(key, "true")}

  private onCloseController = (): void => {this.setState({isOpenController: false})}


}

interface Props {
  isOpen?: boolean
  onClose?: () => void
  maxWidth?: string
  hideCloseButton?: boolean
  customBody?: ReactNode | string
  customFooter?: ReactNode | string
  customHeader?: ReactNode | string
  preventClose?: boolean
}


class State {
  checker: boolean = false
  isOpenController: boolean = true;
}
