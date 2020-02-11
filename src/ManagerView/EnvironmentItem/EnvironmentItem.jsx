/* Copyright (c) 2015 - 2018, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Use in source and binary forms, redistribution in binary form only, with
 * or without modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions in binary form, except as embedded into a Nordic
 *    Semiconductor ASA integrated circuit in a product or a software update for
 *    such product, must reproduce the above copyright notice, this list of
 *    conditions and the following disclaimer in the documentation and/or other
 *    materials provided with the distribution.
 *
 * 2. Neither the name of Nordic Semiconductor ASA nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * 3. This software, with or without modification, must only be used with a Nordic
 *    Semiconductor ASA integrated circuit.
 *
 * 4. Any software provided in binary form under this license must not be reverse
 *    engineered, decompiled, modified and/or disassembled.
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import './style.scss';

import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import NrfCard from '../../NrfCard/NrfCard';

const PrimaryButton = ({ label, ...props }) => (
    <Button className="toolchain-item-button" variant="primary" {...props}>
        {label}
    </Button>
);
PrimaryButton.propTypes = {
    label: PropTypes.string.isRequired,
};

const EnvironmentItem = ({
    environment: {
        toolchainDir,
        version,
        progress,
        isRemoving,
        isCloning,
        isWestPresent,
    },
    cloneNcs,
    install,
    isInProcess,
    open,
    openBash,
    openFolder,
    openToolchainFolder,
    removeEnvironment,
    removeToolchain,
}) => {
    const isInstalled = !!toolchainDir;
    const progressPct = isInstalled ? 100 : (progress || 0);
    let progressLabel = progress ? `${progress}%` : '';
    progressLabel = isInstalled ? 'Installed' : progressLabel;
    progressLabel = isCloning ? 'Cloning SDK' : progressLabel;
    progressLabel = isRemoving ? 'Removing' : progressLabel;
    let progressClassName = isInstalled ? 'toolchain-installed' : 'toolchain-installing';
    progressClassName = isCloning ? 'toolchain-installing' : progressClassName;
    progressClassName = isRemoving ? 'toolchain-removing' : progressClassName;
    return (
        <NrfCard>
            <Row noGutters className="py-1">
                <Col xs="auto my-2 mr-3" className="d-flex align-items-start">
                    {/* <AppIcon toolchain={toolchain} /> */}
                </Col>
                <Col>
                    <Row className="toolchain-item-info">
                        <Col className="h4">
                            nRF Connect SDK {version}
                        </Col>
                    </Row>
                    <Row className="toolchain-item-info">
                        <Col className="text-muted">
                            {toolchainDir}
                        </Col>
                    </Row>
                    <Row className="toolchain-item-info">
                        <Col className="toolchain-item-progress">
                            <ProgressBar>
                                <ProgressBar
                                    now={progressPct}
                                    label={progressLabel}
                                    striped={!isInstalled || isRemoving || isCloning}
                                    animated={!isInstalled || isRemoving || isCloning}
                                    className={progressClassName}
                                />
                                {(progressPct === 0) && (
                                    <ProgressBar
                                        now={100}
                                        label="Available"
                                        className="toolchain-available"
                                    />
                                )}
                            </ProgressBar>
                        </Col>
                    </Row>
                </Col>
                <Col xs="auto ml-auto" className="d-flex align-items-center my-3 pl-3">
                    <ButtonToolbar className="wide-btns">
                        { !isInstalled && (
                            <PrimaryButton
                                onClick={install}
                                label="Install"
                                disabled={isInProcess}
                            />
                        )}
                        { isInstalled && !isWestPresent && (
                            <PrimaryButton
                                onClick={cloneNcs}
                                label="Clone NCS"
                                disabled={isInProcess}
                            />
                        )}
                        { isInstalled && isWestPresent && (
                            <PrimaryButton
                                onClick={open}
                                label="Open"
                                disabled={isInProcess}
                            />
                        )}
                        <DropdownButton
                            className="ml-2"
                            variant="outline-primary"
                            title=""
                            alignRight
                            disabled={isInProcess || !isInstalled}
                        >
                            {isInstalled && (
                                <>
                                    <Dropdown.Item
                                        title="Open bash terminal"
                                        onClick={openBash}
                                    >
                                        Open bash
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        title="Open SDK folder"
                                        onClick={openFolder}
                                    >
                                        Open SDK folder
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        title="Open toolchain folder"
                                        onClick={openToolchainFolder}
                                    >
                                        Open toolchain folder
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        title="Update SDK"
                                        onClick={cloneNcs}
                                    >
                                        Update SDK
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        title="Install again :)"
                                        onClick={install}
                                    >
                                        Update toolchain
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        title="Remove toolchain"
                                        onClick={removeToolchain}
                                    >
                                        Remove toolchain
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        title="Remove all"
                                        onClick={removeEnvironment}
                                    >
                                        Remove toochain & SDK
                                    </Dropdown.Item>
                                </>
                            )}
                        </DropdownButton>
                    </ButtonToolbar>
                </Col>
            </Row>
        </NrfCard>
    );
};

EnvironmentItem.propTypes = {
    environment: PropTypes.shape({
        toolchainDir: PropTypes.string,
        version: PropTypes.string.isRequired,
        progress: PropTypes.number,
        isCloning: PropTypes.bool,
        isRemoving: PropTypes.bool,
        isWestPresent: PropTypes.bool,
    }).isRequired,
    cloneNcs: PropTypes.func.isRequired,
    install: PropTypes.func.isRequired,
    isInProcess: PropTypes.bool.isRequired,
    open: PropTypes.func.isRequired,
    openBash: PropTypes.func.isRequired,
    openFolder: PropTypes.func.isRequired,
    openToolchainFolder: PropTypes.func.isRequired,
    removeEnvironment: PropTypes.func.isRequired,
    removeToolchain: PropTypes.func.isRequired,
};
export default EnvironmentItem;
