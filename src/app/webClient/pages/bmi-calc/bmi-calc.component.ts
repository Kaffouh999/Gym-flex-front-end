import { Component } from "@angular/core";

@Component({
    selector: "app-bmi-calc",
    templateUrl: "./bmi-calc.component.html",
    styleUrls: ["./bmi-calc.component.scss"],
})
export class BmiCalcComponent {
    visible: boolean = false;
    bmi: number = 0;
    height: number | undefined = undefined;
    weight: number | undefined = undefined;
    age: number | undefined = undefined;
    gender: boolean = false;

    calculateBmi() {
        if (
            this.height == undefined ||
            this.weight == undefined ||
            this.age == undefined
        ) {
            console.log("Please fill in all fields");
        } else {
            // Convert height to meters
            this.height = this.height / 100;

            // Calculate BMI
            let bmi = this.weight / (this.height * this.height);

            // Adjust BMI based on age and gender
            if (this.age < 18) {
                // BMI percentiles are age and gender specific for children and adolescents
                // Here we assume that age is in years and gender is either "male" or "female"
                if (this.gender) {
                    bmi = 1.51 * bmi - 0.7 * this.age - 2.86;
                } else {
                    bmi = 1.51 * bmi - 0.7 * this.age + 1.4;
                }
            } else if (this.gender) {
                // For adults, BMI ranges are typically the same for males and females
                bmi += 0.06 * this.age - 0.12;
            } else if (!this.gender) {
                bmi += 0.05 * this.age - 0.1;
            }

            // Round BMI to one decimal place
            this.bmi = bmi;

            this.visible = true;
        }
    }
}
