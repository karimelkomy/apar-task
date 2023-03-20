import { sprintf } from "sprintf-js";
import GenericElement from "../components/GenericElement";

export default class HomePage extends GenericElement {
  constructor() {
    super();
    this.countryPicker = '//div[@class="country-current"]';
    this.countryButton =
      '//div[@id="country-wrapper"]//span[contains(@id, "contry-lable") and contains(text(), "%s")]';
    this.planTypeText = '//strong[@class="plan-title" and text()="%s"]';
    this.monthlyPriceText =
      '//div[@id="currency-%s" and @class="price" and contains(., "%s")]';
  }

  async selectCountry({ packageDetails }) {
    const { country } = packageDetails;

    await this.click(this.countryPicker);
    await this.click(sprintf(this.countryButton, country));
  }

  async validatePlans({ packageDetails }) {
    const { plansDetails } = packageDetails;

    for (const planDetails of plansDetails) {
      const { planType, price, currency, duration } = planDetails;

      await this.validateElementVisibility(
        sprintf(this.planTypeText, planType)
      );

      await this.validateElementVisibility(
        sprintf(this.monthlyPriceText, planType.toLowerCase(), price)
      );
      await this.validateElementVisibility(
        sprintf(this.monthlyPriceText, planType.toLowerCase(), currency)
      );
      await this.validateElementVisibility(
        sprintf(this.monthlyPriceText, planType.toLowerCase(), duration)
      );
    }
  }
}
