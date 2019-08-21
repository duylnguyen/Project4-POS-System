import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const ModalPay = () => (
  <Modal trigger={<Button className="payBtn">PAY</Button>}>
    <Modal.Header>Payment Process</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Payment has been completed!</Header>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default ModalPay