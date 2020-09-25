
import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../context'
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

import { getDaoContract, getRewards, getStakesData, getListedTokens } from '../../client/web3'

import { Table, Row, Col, message } from 'antd';

import { ColourCoin } from '../components/common'
import { H1, Button, Center } from '../components/elements';

import { convertFromWei } from '../../utils'

const Earn = (props) => {

    // Show Spartan Token Info
    // Show Spartan Balance
    // Input field of token, upgrade button


    const context = useContext(Context)
    // const [connecting, setConnecting] = useState(false)
    // const [connected, setConnected] = useState(false)
    // const [visible, setVisible] = useState(false);

    const [reward, setReward] = useState(false);

    useEffect(() => {
        if (context.connected) {
            getData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context.connected])

    const getData = async () => {

        let rewards = await getRewards(context.walletData.address)
        console.log({rewards})
        setReward(rewards)

    }

    const lock = async (record) => {
        let contract = getDaoContract()
        let tx = await contract.methods.lock(record.poolAddress, record.units).send({ from: context.walletData.address })
        console.log(tx.transactionHash)
        await refreshData()
    }

    const unlock = async (record) => {
        let contract = getDaoContract()
        let tx = await contract.methods.unlock(record.poolAddress).send({ from: context.walletData.address })
        console.log(tx.transactionHash)
        await refreshData()
    }

    const harvest = async () => {
        let contract = getDaoContract()
        let tx = await contract.methods.harvest().send({ from: context.walletData.address })
        console.log(tx.transactionHash)
        await refreshData()
    }

    const refreshData = async () => {
        let stakesData = await getStakesData(context.walletData.address, await getListedTokens())
        context.setContext({ 'stakesData': stakesData })
        message.success('Transaction Sent!', 2);
    }

    const columns = [
        {
            render: (record) => (
                <div>
                    <ColourCoin symbol={record.symbol} size={36} />
                </div>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name) => (
                <h3>{name}</h3>
            )
        },
        {
            title: 'Balance',
            dataIndex: 'units',
            key: 'units',
            render: (units) => (
                <p>{convertFromWei(units)}</p>
            )
        },
        {
            title: 'Locked',
            dataIndex: 'locked',
            key: 'locked',
            render: (locked) => (
                <p>{convertFromWei(locked)}</p>
            )
        },
        {
            render: (record) => (
                <div style={{ textAlign: 'right' }}>
                    <Button
                        icon={<LoginOutlined />}
                        onClick={() => lock(record)}
                    >DEPOSIT</Button>
                    <Button
                        icon={<LogoutOutlined />}
                        type={'secondary'}
                        onClick={() => unlock(record)}
                    >WITHDRAW</Button>
                </div>

            )
        }
    ]


    return (
        <div>
            <Row>
                <Col xs={24} className="cntr">
                  <h1>Earn</h1>
                  <h2>Earn yield by depositing liquidity in the SPARTAN DAO.</h2>
                </Col>
                <Col xs={24} className="cntr">
                    <Table
                        dataSource={context.stakesData}
                        columns={columns} pagination={false}
                        rowKey="symbol" />
                </Col>
            </Row>
            <br/>

            <Row>
                <Col xs={24}>
                    <Row>
                        <Col xs={24}>
                            <Row>
                                <Col xs={24}>
                                    <Center><h2>CLAIM REWARDS</h2></Center>
                                    <Center><H1>{convertFromWei(reward)}</H1></Center>
                                    <Center><Button onClick={harvest} type={'primary'} style={{ marginTop: 10 }}>HARVEST YIELD</Button></Center>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </div>
    )

}

export default Earn
