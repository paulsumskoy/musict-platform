import { Container, Stepper } from "@material-ui/core";
import React, { Children } from "react";

interface StepWrapperProps {
    activeStep: number;

}

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                
            </Stepper>
        </Container>
    );
};

export default StepWrapper;