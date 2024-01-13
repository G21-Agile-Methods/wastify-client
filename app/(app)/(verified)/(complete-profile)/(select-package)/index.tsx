import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import { useAuth } from '../../../../../src/context/auth-context'
import Button from '../../../../../src/components/ui/button'
import { WrenchScrewdriverIcon, TrashIcon } from "react-native-heroicons/outline";
import { COLORS } from '../../../../../src/styles/colors';
import Heading from '../../../../../src/components/hierarchy/text/heading';
import Body from '../../../../../src/components/hierarchy/text/body';
import Subheading from '../../../../../src/components/hierarchy/text/subheading';
import { useSession } from '../../../../../src/components/providers/session-provider';
import Container from '../../../../../src/components/ui/container';
import { Stack, useNavigation } from 'expo-router';
import NavigationLayout from '../../../../../src/layout/navigation-layout';
import BottomNav from '../../../../../src/components/navigation/bottom-nav';
import storage from '../../../../../src/config/storage';

const HomeScreen = () => {
  const { signOut,  } = useSession()
  

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <NavigationLayout>
      
      <Container >
       
        <Button full action={signOut} label='Logout' />

      </Container>
    

    </NavigationLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    weight: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 8

  },
  screen: {
    flex: 1,
    height: "100%",
    weight: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 8
  }
})

export default HomeScreen