/**
 * External dependencies
 */
import { View, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

/**
 * WordPress dependencies
 */
import { useState, useContext, useMemo } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { performLayoutAnimation } from '../layout-animation';
import {
	BottomSheetNavigationContext,
	BottomSheetNavigationProvider,
} from './bottom-sheet-navigation-context';

const AnimationSpec = {
	animation: 'timing',
	config: {
		duration: 200,
		easing: Easing.ease,
	},
};

const fadeConfig = ( { current } ) => {
	return {
		cardStyle: {
			opacity: current.progress,
		},
	};
};

const options = {
	transitionSpec: {
		open: AnimationSpec,
		close: AnimationSpec,
	},
	headerShown: false,
	gestureEnabled: false,
	cardStyleInterpolator: fadeConfig,
};

const ANIMATION_DURATION = 190;

function BottomSheetNavigationContainer( {
	children,
	animate,
	main,
	theme,
	stack,
} ) {
	const context = useContext( BottomSheetNavigationContext );
	const [ currentHeight, setCurrentHeight ] = useState(
		context.currentHeight || 1
	);

	const setHeight = ( height, layout ) => {
		if ( currentHeight !== height && height > 1 ) {
			if ( animate && layout && currentHeight === 1 ) {
				setCurrentHeight( height );
			} else if ( animate ) {
				performLayoutAnimation( ANIMATION_DURATION );
				setCurrentHeight( height );
			} else {
				setCurrentHeight( height );
			}
		}
	};
	return useMemo( () => {
		return (
			<View style={ { height: currentHeight } }>
				<BottomSheetNavigationProvider
					value={ { setHeight, currentHeight } }
				>
					{ main ? (
						<NavigationContainer theme={ theme }>
							<stack.Navigator screenOptions={ options }>
								{ children }
							</stack.Navigator>
						</NavigationContainer>
					) : (
						<stack.Navigator screenOptions={ options }>
							{ children }
						</stack.Navigator>
					) }
				</BottomSheetNavigationProvider>
			</View>
		);
	}, [ currentHeight ] );
}

export default BottomSheetNavigationContainer;
