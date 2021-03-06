/* global MoleculeRadioButtonField */

/* eslint react/jsx-no-undef:0 */

import React from 'react'
import {render} from '@testing-library/react'

import chai, {expect} from 'chai'
import chaiDOM from 'chai-dom'

chai.use(chaiDOM)

const setupBuilder = Component => props => {
  const container = document.createElement('div')
  container.setAttribute('id', 'test-container')
  const utils = render(<Component {...props} />, {
    container: document.body.appendChild(container)
  })
  return utils
}

const setup = setupBuilder(MoleculeRadioButtonField)

chai.use(chaiDOM)

describe('molecule/radioButtonField', () => {
  describe('props', () => {
    describe('label & nodeLabel', () => {
      it('should render the empty component if there is not label or nodeLabel props', async () => {
        // Given
        // When
        const {container} = setup()
        // Then
        expect(container).to.be.not.undefined
      })

      it('should render the component if there is label', async () => {
        // Given
        const props = {
          label: 'label'
        }
        // When
        const {container, getByText} = setup(props)
        // Then
        const labelElement = getByText(props.label)
        expect(container).to.be.not.undefined
        expect(labelElement).to.be.not.undefined
        expect(labelElement.innerText).to.equal(props.label)
        expect(labelElement.classList.contains('sui-AtomLabel')).to.be.true
      })
      it('should render the component if there is nodeLabel', async () => {
        // Given
        const text = 'nodeLabel'
        const props = {
          nodeLabel: <div className="testNodeLabel">{text}</div>
        }
        // When
        const {container, getByText} = setup(props)

        // Then
        const labelElement = getByText(text)
        expect(container).to.be.not.undefined
        expect(labelElement).to.be.not.undefined
        expect(labelElement.innerText).to.equal(text)
        expect(labelElement.classList.contains('testNodeLabel')).to.be.true
      })
      it('should render the component with label value if there is label and nodeLabel props', async () => {
        // Given
        const text = 'label'
        const props = {
          label: text,
          nodeLabel: <div className="testNodeLabel">{text}</div>
        }
        // When
        const {container, getByText} = setup(props)

        // Then
        const labelElement = getByText(text)
        expect(container).to.be.not.undefined
        expect(labelElement).to.be.not.undefined
        expect(labelElement.innerText).to.equal(props.label)
        expect(labelElement.classList.contains('sui-AtomLabel')).to.be.true
        expect(labelElement.classList.contains('testNodeLabel')).to.be.false
      })
    })
  })
})
