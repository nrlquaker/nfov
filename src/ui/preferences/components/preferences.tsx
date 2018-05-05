import * as React from 'react'
import { Component, Props } from 'react'
// @ts-ignore: no type definition
import { SegmentedControl, SegmentedControlItem, Text, Window } from 'react-desktop/macOs'
import ASCII from './ascii/ascii'

export interface PreferencesState {
    selected: number
}

export class Preferences extends Component<Props<string>, PreferencesState> {
    constructor(props: Props<string>) {
        super(props)
        this.state = { selected: 1 }
    }

    public render(): JSX.Element {
        return (
            <Window>
                <SegmentedControl box>{this.renderItems()}</SegmentedControl>
            </Window>
        )
    }

    private renderItems(): JSX.Element[] {
        return [
            this.renderItem(1, 'ASCII', <ASCII />),
            this.renderItem(2, 'General', <Text>To be added...</Text>)
        ]
    }

    private renderItem(key: number, title: string, content: JSX.Element): JSX.Element {
        return (
            <SegmentedControlItem
                key={key}
                title={title}
                selected={this.state.selected === key}
                onSelect={() => this.setState({ selected: key })}>
                {content}
            </SegmentedControlItem>
        )
    }
}
