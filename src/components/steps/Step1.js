import React from 'react';
import Typography from '@material-ui/core/Typography';
import MainContainer from '../MainContainer';
import Form from '../Form';
import Input from '../Input';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../PrimaryButton';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useHistory } from 'react-router-dom';

const schema = yup.object().shape({
	firstName: yup
		.string()
		.matches(/^([^0-9]*)$/, 'First name should not contain numbers')
		.required('First name is required field'),
	lastName: yup
		.string()
		.matches(/^([^0-9]*)$/, 'Last name should not contain numbers')
		.required('Last name is required field'),
});

const Step1 = () => {
	const history = useHistory();

	const { register, handleSubmit, errors } = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema)
	});

	const onSubmit = ( data ) => {
		history.push('/step2');
	};

	return (
		<MainContainer>
			<Typography
				component="h2"
				variant="h5"
				>Step 1
			</Typography>
			<Form onSubmit={ handleSubmit(onSubmit) }>
				<Input
					ref={ register }
					id="firstName"
					type="text"
					label="First Name"
					name="firstName"
					error={ !!errors.firstName }
					helperText={ errors?.firstName?.message }
				/>
				<Input
					ref={ register }
					id="lastName"
					type="text"
					label="Last Name"
					name="lastName"
					error={ !!errors.lastName }
					helperText={ errors?.lastName?.message }
				/>
				<PrimaryButton>Next</PrimaryButton>
			</Form>
		</MainContainer>
	);
};

export default Step1;