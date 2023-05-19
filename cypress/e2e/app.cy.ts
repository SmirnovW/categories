import {
	CHECK_BOX_CHECK_TEST_ID,
	CHECK_BOX_CONTROL_TEST_ID,
} from 'components/checkbox/constants';
import { LABEL_CONTROL_TEST_ID } from 'components/label/constants';
import { FilterItemMock } from 'mocks/store';
import { Translations } from 'constants/translations';

describe('categories tree', () => {
	it('should check the filters flow', () => {
		cy.visit('http://localhost:3000/');
		const rootControl = cy.get(
			`[data-testid="${CHECK_BOX_CONTROL_TEST_ID}${FilterItemMock.name}"]`
		);
		rootControl.click();
		cy.wait(1000);
		cy.contains(Translations.select_all).click();
		cy.wait(1000);
		const subControl = cy.get(
			`[data-testid="${LABEL_CONTROL_TEST_ID}${FilterItemMock.children[0].name}"]`
		);
		subControl.click();
		const subCheckbox = cy.get(
			`[data-testid="${CHECK_BOX_CHECK_TEST_ID}${FilterItemMock.children[0].name}"]`
		);
		subCheckbox.should('not.be.checked');
		rootControl.click();
		rootControl.should('not.be.checked');
		cy.get(`[data-testid^="${LABEL_CONTROL_TEST_ID}"]`).should('not.exist');
	});
});
