/**
 * Internal dependencies
 */
import { Flex, FlexItem } from '../';
import { View } from '../../ui/view';

export default {
	component: Flex,
	title: 'G2 Components (Experimental)/Flex',
};

export const _default = () => {
	return (
		<>
			<Flex gap={ 3 }>
				<View>Item</View>
				<View>Item</View>
			</Flex>
			<Flex direction={ [ 'column', 'row' ] } gap={ 3 }>
				<View css={ { width: '180px' } }>Item</View>
				<FlexItem isBlock>
					<View>Item</View>
				</FlexItem>
				<View>Item</View>
				<View>Item</View>
			</Flex>
		</>
	);
};
