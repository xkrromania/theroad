import React, {useState} from 'react';
import typesService from '../services/types';
import statsService from '../services/stats';

import { connect } from 'react-redux';
import { addCard } from './cardsSlice';
import AddCardForm from './AddCardForm';

const mapDispatch = { addCard };

const AddCard = ({ addCard }) => {
  const initialType = typesService.getInitialState();
  const initialStats = statsService.getInitialState();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(initialType);
  const [stats, setStats] = useState(initialStats);

  const onNameChange = e => setName(e.target.value);
  const onDescriptionChange = e => setDescription(e.target.value);
  const onStatsChange = e => {
    const stat = e.target.name;
    const value = e.target.value;

    return setStats(prevState => {
      return { ...prevState, [stat]: value };
    });
  };
  const onTypeChange = e => setType(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    addCard(name, description, type, stats);
    setName('');
    setDescription('');
    setType(initialType);
    setStats(initialStats);
  };

  const handles = {
    name: onNameChange,
    description: onDescriptionChange,
    type: onTypeChange,
    submit: onSubmit,
    stats: onStatsChange
  };

  return (
    <AddCardForm
      name={name}
      description={description}
      type={type}
      stats={stats}
      handles={handles}>
    </AddCardForm>
  );
};

export default connect(
  null,
  mapDispatch
)(AddCard);
