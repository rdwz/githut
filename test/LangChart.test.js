import React from 'react'
import expect from 'expect.js'
import LangTable from '../src/js/components/LangTable'
import LangChart from '../src/js/components/LangChart'
import EventStore from "../src/js/stores/EventStore"
import TableStore from "../src/js/stores/TableStore"
import HistStore from "../src/js/stores/HistStore"
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })
import _ from 'lodash'

describe('Test LangChart', () => {
    it('component import should work', () => {
        expect(LangChart).not.to.be.equal(null)
    })

    it('render should work', () => {
        mount(<LangChart store={EventStore} table={TableStore}/>)
    }).timeout(10000)

    it('chart should contain JavaScript and Python', async () => {

        mount(<LangChart store={EventStore} table={TableStore}/>)

        const wrapper = mount(
            <LangTable store={EventStore} hist={HistStore} table={TableStore}>
                <LangChart store={EventStore} table={TableStore}/>
            </LangTable>
        )

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
        await sleep(3000)
        const html = wrapper.children().html()
        expect(html).to.contain('JavaScript')
        expect(html).to.contain('Python')
    }).timeout(10000)
})
