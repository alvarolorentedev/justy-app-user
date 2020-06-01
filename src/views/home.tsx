import React, { useState } from 'react';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Text,
  Form,
  Item,
  Label,
  Input,
  Button,
  Toast,
} from 'native-base';
import { observer } from 'mobx-react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Image } from 'react-native';
import useStores from '../utils/useStores';
import BuyerStore from '../stores/buyer';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  buyerStore: BuyerStore;
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  form: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
});

export const Home: React.FC<Props> = ({ navigation, buyerStore }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [readyForCreate, setReadyForCreate] = useState(false);

  const createUser = async () => {
    buyerStore.create(email, password);
    if (!buyerStore.error) navigation.navigate('Search');
    else Toast.show({ text: buyerStore.error, buttonText: 'Okay' });
  };
  const validForm = () => {
    if (email && password) {
      setReadyForCreate(true);
    } else {
      setReadyForCreate(false);
    }
  };
  const UpdateEmail = (emailInput) => {
    setEmail(emailInput);
    validForm();
  };
  const UpdatePassword = (passwordInput) => {
    setPassword(passwordInput);
    validForm();
  };
  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        {/* eslint-disable-next-line global-require */}
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              data-testid="buyer-email-input"
              value={email}
              onChangeText={UpdateEmail}
            />
          </Item>
          <Item floatingLabel>
            <Label>password</Label>
            <Input
              data-testid="buyer-password-input"
              value={password}
              onChangeText={UpdatePassword}
            />
          </Item>
        </Form>
        <Button
          block
          dark
          disabled={!readyForCreate}
          style={styles.button}
          data-testid="buyer-create-button"
          onPress={createUser}
        >
          <Text>Create User</Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab />
      </Footer>
    </Container>
  );
};

export default observer((props) =>
  Home({ buyerStore: useStores().buyerStore, ...props })
);
