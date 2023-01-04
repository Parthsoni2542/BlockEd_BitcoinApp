
import React from 'react';
import BaseComponent from './BaseComponent';
import PropTypes from 'prop-types';
import styles from './style';


import { View, Modal, Text, TouchableOpacity, Image, ViewPropTypes } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';

let componentIndex = 0;

const propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    initValue: PropTypes.string,
    style: ViewPropTypes.style,
    selectStyle: ViewPropTypes.style,
    optionStyle: ViewPropTypes.style,
    optionTextStyle: ViewPropTypes.style,
    sectionStyle: ViewPropTypes.style,
    sectionTextStyle: ViewPropTypes.style,
    cancelStyle: ViewPropTypes.style,
    cancelTextStyle: ViewPropTypes.style,
    overlayStyle: ViewPropTypes.style,
    cancelText: PropTypes.string,
};


const defaultProps = {
    data: [],
    onChange: () => { },
    initValue: 'Select me!',
    style: {},
    selectStyle: {},
    optionStyle: {},
    optionTextStyle: {},
    sectionStyle: {},
    sectionTextStyle: {},
    cancelStyle: {},
    cancelTextStyle: {},
    overlayStyle: {},
    cancelText: 'cancel',
}


export default class CustomCountryPickerModal extends BaseComponent {


    constructor() {

        super();

        // this._bind(this.open, this.close);

        // this.close = this.close.bind(this);
        // this.open = this.open.bind(this);

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.renderChildren = this.renderChildren.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            animationType: 'slide',
            modalVisible: false,
            transparent: false,
            selected: 'please select',
            data: [],
            shouldUpdateData: false,
        };
    }

    componentDidMount() {
        this.setState({ selected: this.props.initValue });
        this.setState({ cancelText: this.props.cancelText });
    }


    static getDerivedStateFromProps(props, state) {
        if (props.data !== state.data) {
            return {
                data: props.data,
            };
        }
        return null;
    }

    onChange(item) {
        this.props.onChange(item);
        this.setState({ selected: item.label });
        this.close();
    }

    close() {
        this.setState({
            modalVisible: false,
        });
    }

    open() {
        // if (this.state.data.length == 0) {
        //     this.state.data = this.props.data;
        // }

        this.setState({ modalVisible: true, })

    }


    render() {
        const dp = (
            <Modal
                transparent
                ref={(ref) => { this.modal = ref; }}
                visible={this.state.modalVisible}
                onRequestClose={this.close}
                animationType={this.state.animationType}
            >
                {this.renderOptionList()}
            </Modal>
        );

        return (
            <View style={this.props.style}>
                {dp}

                <TouchableOpacity onPress={this.open}>{this.renderChildren.bind(null)}</TouchableOpacity>
            </View>
        );
    }

    renderChildren() {
        if (this.props.children) {
            return this.props.children;
        }
    }


    renderOptionList() {


        return (
            // <View
            //     style={[styles.overlayStyle, this.props.overlayStyle]}
            //     key={`modalPicker${componentIndex++}`}
            // >
            //     <View style={styles.optionContainer}>
            //         <ScrollView keyboardShouldPersistTaps="always">
            //             <View style={{ paddingHorizontal: 10 }}>{options}</View>
            //         </ScrollView>
            //     </View>

            //     <View style={styles.cancelContainer}>
            //         <TouchableOpacity onPress={this.close}>
            //             <View style={[styles.cancelStyle, this.props.cancelStyle]}>
            //                 <Text style={[styles.cancelTextStyle, this.props.cancelTextStyle]}>
            //                     {this.props.cancelText}
            //                 </Text>
            //             </View>
            //         </TouchableOpacity>
            //     </View>
            // </View>

            <View
                style={[styles.overlayStyle, this.props.overlayStyle]}
                key={`modalPicker${componentIndex++}`}
            >
                <View style={styles.optionContainer}>
                    <FlatList
                        data={this.state.data}
                        ref={(list) => this.flatlist = list}
                        ListHeaderComponent={
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', elevation: 10, }}>
                                <TextInput
                                    style={[styles.cancelTextStyle, this.props.cancelTextStyle]}
                                    onEndEditing={(e) => {
                                        let query = e.nativeEvent.text;
                                        let index = this.state.data.findIndex(item => item.label.toLowerCase().includes(query))
                                        console.log(index)
                                        index != -1 && this.flatlist.scrollToIndex({ animated: true, index: index })
                                    }}
                                    placeholder={"Search country"}

                                />


                                {/* <TouchableOpacity onPress={() => {
                                    this.flatlist.scrollToIndex({ animated: true, index:30, })
                                }} >
                                    <View style={[styles.cancelStyle, this.props.cancelStyle]}>
                                        <Text style={[styles.cancelTextStyle, this.props.cancelTextStyle]}>
                                            {this.props.cancelText}
                                        </Text>
                                    </View>

                                </TouchableOpacity> */}

                            </View>
                        }
                        renderItem={(item) => {
                            if (item.section) {
                                return this.renderSection(item.item);
                            }
                            return this.renderOption(item.item);
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        getItemLayout={(data, index) => {
                            return { length: 50, offset: 50 * index, index };
                        }}
                    />
                </View>

                <View style={styles.cancelContainer}>
                    <TouchableOpacity onPress={this.close}>
                        <View style={[styles.cancelStyle, this.props.cancelStyle]}>
                            <Text style={[styles.cancelTextStyle, this.props.cancelTextStyle]}>
                                {this.props.cancelText}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderSection(section) {
        return (
            <View key={section.key} style={[styles.sectionStyle, this.props.sectionStyle]}>
                <Text style={[styles.sectionTextStyle, this.props.sectionTextStyle]}>{section.label}</Text>
            </View>
        );
    }

    renderOption(option) {
        return (
            <View style={{ height: 50, }}>
                <TouchableOpacity key={option.key} onPress={() => this.onChange(option)}>
                    <View
                        style={[
                            styles.optionStyle,
                            this.props.optionStyle,
                            {
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            },
                        ]}
                    >
                        <View style={{ flex: 0.15 }}>
                            <Image source={option.image} resizeMode="stretch" style={{ width: 30, height: 16 }} />
                        </View>
                        <View style={{ flex: 0.7, alignItems: 'center' }}>
                            <Text
                                style={[
                                    styles.optionTextStyle,
                                    this.props.optionTextStyle,
                                    { color: '#434343', fontSize: 14 },
                                ]}
                            >
                                {option.label}
                            </Text>
                        </View>
                        <View style={{ flex: 0.15, alignItems: 'flex-end' }}>
                            <Text
                                style={[
                                    styles.optionTextStyle,
                                    this.props.optionTextStyle,
                                    { color: 'grey', fontSize: 12 },
                                ]}
                            >
                                {option.dialCode}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

CustomCountryPickerModal.propTypes = propTypes;
CustomCountryPickerModal.defaultProps = defaultProps;