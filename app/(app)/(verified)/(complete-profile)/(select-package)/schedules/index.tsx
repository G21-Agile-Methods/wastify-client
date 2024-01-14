import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { useAuth } from '../../../../../../src/context/auth-context'
import Button from '../../../../../../src/components/ui/button'
import { WrenchScrewdriverIcon, TrashIcon } from "react-native-heroicons/outline";
import { COLORS } from '../../../../../../src/styles/colors';
import Heading from '../../../../../../src/components/hierarchy/text/heading';
import Body from '../../../../../../src/components/hierarchy/text/body';
import Subheading from '../../../../../../src/components/hierarchy/text/subheading';
import { useSession } from '../../../../../../src/components/providers/session-provider';
import Container from '../../../../../../src/components/ui/container';
import { Stack, useNavigation } from 'expo-router';
import NavigationLayout from '../../../../../../src/layout/navigation-layout';
import BottomNav from '../../../../../../src/components/navigation/bottom-nav';
import BackButton from '../../../../../../src/components/ui/back-button';
import { useQuery } from '@tanstack/react-query';
import { GET_USER_PICKUPS } from '../../../../../../src/utils/server/pickup';
import Loader from '../../../../../../src/components/core/loading';
import CustomError from '../../../../../../src/components/core/custom-error';
import CustomEmpty from '../../../../../../src/components/core/custom-empty';
import PickupCard from '../../../../../../src/components/cards/pickup-card';

const SchedulesScreen = () => {
  const { signOut, user } = useSession()
  // const user = JSON.parse(session || "")

  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ['pickups'],
    queryFn: async () => {
      if (user && user.token) {
        const homeowners = await GET_USER_PICKUPS()
        return homeowners
      }

    },
    retry: 3,
    staleTime: 300,
    refetchOnMount: true
  })


  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <NavigationLayout>
      <View style={styles.container}  >
        <Text style={styles.title}>
          Your Pickups
        </Text>
        <Button label="Create New Pickup" link="/schedules/new" />
        {/* <ScrollView> */}
          {
            isPending ? <Loader /> : <Container noPadding>
              {
                isError ? <CustomError /> : <Container noPadding isCenter>
                  {
                    data?.length === 0 ? <CustomEmpty title='pickups' /> :
                      <FlatList
                        style={styles.listContainer}
                        data={data}
                        renderItem={({ item }) => <PickupCard data={item} />}
                        keyExtractor={item => item._id}
                      />
                  }
                </Container>
              }

            </Container>
          }
        {/* </ScrollView> */}
      </View>


    </NavigationLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    width: "100%",
    gap: 16,

  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    width: "100%",

  },
  gridContainer: {
    flex: 2, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    width: "100%",
    // backgroundColor: "red"
  },
  spacing: {
    marginBottom: 10,

  },
  listContainer: {
    flex: 1,
    width: "100%",
    // borderWidth: 6
  }
})

export default SchedulesScreen
