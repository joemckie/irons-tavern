import { CombatAchievementListResponse } from '@/app/schemas/wiki';

export const combatAchievementListFixture = {
  query: {
    printrequests: [
      {
        label: '',
        key: '',
        redi: '',
        typeid: '_wpg',
        mode: 2,
        format: false,
      },
      {
        label: 'Combat Achievement JSON',
        key: 'Combat_Achievement_JSON',
        redi: '',
        typeid: '_txt',
        mode: 1,
        format: '',
      },
    ],
    results: {
      "... 'til Dawn": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Grotesque Guardians","type":"Stamina","name":"... \'til Dawn","tier":"Master","id":"96","task":"Kill the Grotesque Guardians 20 times without leaving the instance.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: "... 'til Dawn",
        fullurl: 'https://oldschool.runescape.wiki/w/..._%27til_Dawn',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      '3, 2, 1 - Mage': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corrupted Hunllef","type":"Perfection","name":"3, 2, 1 - Mage","tier":"Elite","id":"101","task":"Kill the Corrupted Hunllef without taking damage off prayer.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: '3, 2, 1 - Mage',
        fullurl: 'https://oldschool.runescape.wiki/w/3,_2,_1_-_Mage',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      '3, 2, 1 - Range': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Crystalline Hunllef","type":"Perfection","name":"3, 2, 1 - Range","tier":"Elite","id":"111","task":"Kill the Crystalline Hunllef without taking damage off prayer.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: '3, 2, 1 - Range',
        fullurl: 'https://oldschool.runescape.wiki/w/3,_2,_1_-_Range',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "A Demon's Best Friend": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Hellhound","type":"Kill Count","name":"A Demon\'s Best Friend","tier":"Easy","id":"122","task":"Kill a Hellhound.","leagueRegion":"Asgarnia,Kandarin,Kourend,Wilderness"}',
          ],
        },
        fulltext: "A Demon's Best Friend",
        fullurl: 'https://oldschool.runescape.wiki/w/A_Demon%27s_Best_Friend',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'A Frozen Foe from the Past': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Skeletal Wyvern","type":"Kill Count","name":"A Frozen Foe from the Past","tier":"Medium","id":"223","task":"Kill a Skeletal Wyvern","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'A Frozen Foe from the Past',
        fullurl:
          'https://oldschool.runescape.wiki/w/A_Frozen_Foe_from_the_Past',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'A Frozen King': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Dagannoth Rex","type":"Mechanical","name":"A Frozen King","tier":"Medium","id":"204","task":"Kill Dagannoth Rex whilst he is immobilized.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'A Frozen King',
        fullurl: 'https://oldschool.runescape.wiki/w/A_Frozen_King',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'A Greater Foe': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Greater Demon","type":"Kill Count","name":"A Greater Foe","tier":"Easy","id":"120","task":"Kill a Greater Demon.","leagueRegion":"Asgarnia,Kandarin,Karamja,Kourend,Misthalin,Morytania,Wilderness"}',
          ],
        },
        fulltext: 'A Greater Foe',
        fullurl: 'https://oldschool.runescape.wiki/w/A_Greater_Foe',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'A Long Trip': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Nightmare","type":"Restriction","name":"A Long Trip","tier":"Grandmaster","id":"190","task":"Kill the Nightmare without any player losing any prayer points.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'A Long Trip',
        fullurl: 'https://oldschool.runescape.wiki/w/A_Long_Trip',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'A Near Miss!': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzTok-Jad","type":"Mechanical","name":"A Near Miss!","tier":"Elite","id":"149","task":"Complete the Fight Caves after surviving a hit from TzTok-Jad without praying.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'A Near Miss!',
        fullurl: 'https://oldschool.runescape.wiki/w/A_Near_Miss!',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'A Not So Special Lizard': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Mechanical","name":"A Not So Special Lizard","tier":"Master","id":"306","task":"Kill the Great Olm in a solo raid without letting him use any of the following special attacks in his second to last phase: Crystal Burst, Lightning Walls, Teleportation Portals or left-hand autohealing.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'A Not So Special Lizard',
        fullurl: 'https://oldschool.runescape.wiki/w/A_Not_So_Special_Lizard',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'A Scaley Encounter': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Lizardman Shaman","type":"Kill Count","name":"A Scaley Encounter","tier":"Easy","id":"174","task":"Kill a Lizardman Shaman.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'A Scaley Encounter',
        fullurl: 'https://oldschool.runescape.wiki/w/A_Scaley_Encounter',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'A Slithery Encounter': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Wyrm","type":"Kill Count","name":"A Slithery Encounter","tier":"Easy","id":"287","task":"Kill a Wyrm.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'A Slithery Encounter',
        fullurl: 'https://oldschool.runescape.wiki/w/A_Slithery_Encounter',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'A Slow Death': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Bryophyta","type":"Restriction","name":"A Slow Death","tier":"Easy","id":"40","task":"Kill Bryophyta with either poison or venom being the final source of damage.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'A Slow Death',
        fullurl: 'https://oldschool.runescape.wiki/w/A_Slow_Death',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'A Smashing Time': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Gargoyle","type":"Kill Count","name":"A Smashing Time","tier":"Medium","id":"97","task":"Kill a Gargoyle.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'A Smashing Time',
        fullurl: 'https://oldschool.runescape.wiki/w/A_Smashing_Time',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'A Timely Snack': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Mechanical","name":"A Timely Snack","tier":"Master","id":"242","task":"Kill Sotetseg after surviving at least 3 ball attacks without sharing the damage and without anyone dying throughout the fight.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'A Timely Snack',
        fullurl: 'https://oldschool.runescape.wiki/w/A_Timely_Snack',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'A siphon will solve this': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Nex","type":"Mechanical","name":"A siphon will solve this","tier":"Master","id":"413","task":"Kill Nex without letting her heal from her Blood Siphon special attack.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'A siphon will solve this',
        fullurl: 'https://oldschool.runescape.wiki/w/A_siphon_will_solve_this',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Abyssal Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Abyssal Sire","type":"Kill Count","name":"Abyssal Adept","tier":"Hard","id":"1","task":"Kill the Abyssal Sire 20 times.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Abyssal Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Abyssal_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Abyssal Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Abyssal Sire","type":"Kill Count","name":"Abyssal Veteran","tier":"Elite","id":"2","task":"Kill the Abyssal Sire 50 times.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Abyssal Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Abyssal_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Airborne Showdown': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kree\'arra","type":"Mechanical","name":"Airborne Showdown","tier":"Hard","id":"12","task":"Finish off Kree\'arra whilst all of his bodyguards are dead.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Airborne Showdown',
        fullurl: 'https://oldschool.runescape.wiki/w/Airborne_Showdown',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Akkhan't Do it": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Mechanical","name":"Akkhan\'t Do it","tier":"Grandmaster","id":"450","task":"Defeat Akkha with all Akkha invocations activated and the path levelled up to at least four, without dying yourself.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: "Akkhan't Do it",
        fullurl: 'https://oldschool.runescape.wiki/w/Akkhan%27t_Do_it',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Alchemical Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Alchemical Hydra","type":"Kill Count","name":"Alchemical Master","tier":"Master","id":"136","task":"Kill the Alchemical Hydra 150 times.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Alchemical Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Alchemical_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Alchemical Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Alchemical Hydra","type":"Speed","name":"Alchemical Speed-Chaser","tier":"Master","id":"144","task":"Kill the Alchemical Hydra in less than 1 minute 45 seconds.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Alchemical Speed-Chaser',
        fullurl: 'https://oldschool.runescape.wiki/w/Alchemical_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Alchemical Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Alchemical Hydra","type":"Speed","name":"Alchemical Speed-Runner","tier":"Grandmaster","id":"145","task":"Kill the Alchemical Hydra in less than 1 minute 20 seconds.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Alchemical Speed-Runner',
        fullurl: 'https://oldschool.runescape.wiki/w/Alchemical_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Alchemical Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Alchemical Hydra","type":"Kill Count","name":"Alchemical Veteran","tier":"Elite","id":"135","task":"Kill the Alchemical Hydra 75 times.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Alchemical Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Alchemical_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Alcleanical Hydra': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Alchemical Hydra","type":"Perfection","name":"Alcleanical Hydra","tier":"Master","id":"142","task":"Kill the Alchemical Hydra without taking any damage.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Alcleanical Hydra',
        fullurl: 'https://oldschool.runescape.wiki/w/Alcleanical_Hydra',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'All Praise Zebak': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Mechanical","name":"All Praise Zebak","tier":"Grandmaster","id":"454","task":"Defeat Zebak without losing a single prayer point. You must also meet the conditions of the \'Rockin\' Around The Croc\' achievement.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'All Praise Zebak',
        fullurl: 'https://oldschool.runescape.wiki/w/All_Praise_Zebak',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'All out of medics': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Mechanical","name":"All out of medics","tier":"Master","id":"457","task":"Defeat Kephri without letting her heal above 25% after the first down. The \'Medic\' invocation must be activated. You must do this without dying yourself.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'All out of medics',
        fullurl: 'https://oldschool.runescape.wiki/w/All_out_of_medics',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Amascut's Remnant": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Mechanical","name":"Amascut\'s Remnant","tier":"Grandmaster","id":"446","task":"Complete the Tombs of Amascut at raid level 500 or above without anyone dying.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: "Amascut's Remnant",
        fullurl: 'https://oldschool.runescape.wiki/w/Amascut%27s_Remnant',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Amoxliatl Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Amoxliatl","type":"Kill Count","name":"Amoxliatl Adept","tier":"Hard","id":"580","task":"Kill Amoxliatl 20 times.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Amoxliatl Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Amoxliatl_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Amoxliatl Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Amoxliatl","type":"Kill Count","name":"Amoxliatl Champion","tier":"Medium","id":"579","task":"Kill Amoxliatl once.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Amoxliatl Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Amoxliatl_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Amoxliatl Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Amoxliatl","type":"Speed","name":"Amoxliatl Speed-Chaser","tier":"Elite","id":"582","task":"Kill Amoxliatl in less than 30 seconds.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Amoxliatl Speed-Chaser',
        fullurl: 'https://oldschool.runescape.wiki/w/Amoxliatl_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Amoxliatl Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Amoxliatl","type":"Speed","name":"Amoxliatl Speed-Trialist","tier":"Hard","id":"581","task":"Kill Amoxliatl in less than 1 minute.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Amoxliatl Speed-Trialist',
        fullurl: 'https://oldschool.runescape.wiki/w/Amoxliatl_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Animal Whisperer': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Commander Zilyana","type":"Perfection","name":"Animal Whisperer","tier":"Grandmaster","id":"214","task":"Kill Commander Zilyana in a private instance without taking any damage from the boss or bodyguards.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Animal Whisperer',
        fullurl: 'https://oldschool.runescape.wiki/w/Animal_Whisperer',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Anti-Bite Mechanics': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Cerberus","type":"Perfection","name":"Anti-Bite Mechanics","tier":"Elite","id":"56","task":"Kill Cerberus without taking any melee damage.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Anti-Bite Mechanics',
        fullurl: 'https://oldschool.runescape.wiki/w/Anti-Bite_Mechanics',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Anticoagulants: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Entry Mode","type":"Mechanical","name":"Anticoagulants","tier":"Elite","id":"386","task":"Defeat the Maiden of Sugadinti in the Theatre of Blood: Entry Mode without letting any bloodspawn live for longer than 10 seconds.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Anticoagulants',
        fullurl: 'https://oldschool.runescape.wiki/w/Anticoagulants',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Antifire Protection': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"King Black Dragon","type":"Restriction","name":"Antifire Protection","tier":"Medium","id":"166","task":"Kill the King Black Dragon with an antifire potion active and an antidragon shield equipped.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Antifire Protection',
        fullurl: 'https://oldschool.runescape.wiki/w/Antifire_Protection',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Anvil No More': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Mechanical","name":"Anvil No More","tier":"Master","id":"310","task":"Kill Tekton before he returns to his anvil for a second time after the fight begins.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Anvil No More',
        fullurl: 'https://oldschool.runescape.wiki/w/Anvil_No_More',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Appropriate Tools': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Entry Mode","type":"Mechanical","name":"Appropriate Tools","tier":"Elite","id":"387","task":"Defeat the Pestilent Bloat in the Theatre of Blood: Entry Mode with everyone having a salve amulet equipped.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Appropriate Tools',
        fullurl: 'https://oldschool.runescape.wiki/w/Appropriate_Tools',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Arachnid Lover': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Araxxor","type":"Stamina","name":"Arachnid Lover","tier":"Master","id":"567","task":"Kill Araxxor 10 times without leaving.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Arachnid Lover',
        fullurl: 'https://oldschool.runescape.wiki/w/Arachnid_Lover',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Araxxor Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Araxxor","type":"Kill Count","name":"Araxxor Master","tier":"Master","id":"557","task":"Kill Araxxor 75 times.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Araxxor Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Araxxor_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Araxxor Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Araxxor","type":"Speed","name":"Araxxor Speed-Chaser","tier":"Master","id":"559","task":"Kill Araxxor 5 times in 10:00.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Araxxor Speed-Chaser',
        fullurl: 'https://oldschool.runescape.wiki/w/Araxxor_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Araxxor Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Araxxor","type":"Speed","name":"Araxxor Speed-Runner","tier":"Grandmaster","id":"560","task":"Kill Araxxor 6 times in 10:00.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Araxxor Speed-Runner',
        fullurl: 'https://oldschool.runescape.wiki/w/Araxxor_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Araxxor Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Araxxor","type":"Speed","name":"Araxxor Speed-Trialist","tier":"Elite","id":"558","task":"Kill Araxxor 4 times in 10:00.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Araxxor Speed-Trialist',
        fullurl: 'https://oldschool.runescape.wiki/w/Araxxor_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Araxxor Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Araxxor","type":"Kill Count","name":"Araxxor Veteran","tier":"Elite","id":"556","task":"Kill Araxxor 25 times.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Araxxor Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Araxxor_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Araxyte Betrayal': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Araxxor","type":"Mechanical","name":"Araxyte Betrayal","tier":"Master","id":"566","task":"Have an Araxyte kill three other Araxytes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Araxyte Betrayal',
        fullurl: 'https://oldschool.runescape.wiki/w/Araxyte_Betrayal',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Arooo No More': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Cerberus","type":"Mechanical","name":"Arooo No More","tier":"Master","id":"53","task":"Kill Cerberus without any of the Summoned Souls being spawned.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Arooo No More',
        fullurl: 'https://oldschool.runescape.wiki/w/Arooo_No_More',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Ash Collector': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"K\'ril Tsutsaroth","type":"Stamina","name":"Ash Collector","tier":"Grandmaster","id":"340","task":"Kill K\'ril Tsutsaroth 20 times in a private instance without leaving the room.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Ash Collector',
        fullurl: 'https://oldschool.runescape.wiki/w/Ash_Collector',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Attack, Step, Wait': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Entry Mode","type":"Mechanical","name":"Attack, Step, Wait","tier":"Elite","id":"394","task":"Survive Verzik Vitur\'s second phase in the Theatre of Blood: Entry Mode without anyone getting bounced by Verzik.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Attack, Step, Wait',
        fullurl: 'https://oldschool.runescape.wiki/w/Attack,_Step,_Wait',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Avoiding Those Little Arms': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Giant Mole","type":"Perfection","name":"Avoiding Those Little Arms","tier":"Medium","id":"182","task":"Kill the Giant Mole without her damaging anyone.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Avoiding Those Little Arms',
        fullurl:
          'https://oldschool.runescape.wiki/w/Avoiding_Those_Little_Arms',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Axe Enthusiast': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vardorvis","type":"Mechanical","name":"Axe Enthusiast","tier":"Grandmaster","id":"492","task":"Kill Vardorvis after surviving for 3 minutes of Vardorvis\' max speed, and never leaving the centre 25 tiles.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Axe Enthusiast',
        fullurl: 'https://oldschool.runescape.wiki/w/Axe_Enthusiast',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Ba-Bananza': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Mechanical","name":"Ba-Bananza","tier":"Master","id":"453","task":"Defeat Ba-Ba with all Ba-Ba invocations activated and the path levelled up to at least four, without dying yourself.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Ba-Bananza',
        fullurl: 'https://oldschool.runescape.wiki/w/Ba-Bananza',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Back in My Day...': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Restriction","name":"Back in My Day...","tier":"Master","id":"253","task":"Complete the Theatre of Blood without any member of the team equipping a Scythe of Vitur.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Back in My Day...',
        fullurl: 'https://oldschool.runescape.wiki/w/Back_in_My_Day...',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Back to Our Roots': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Moons of Peril","type":"Restriction","name":"Back to Our Roots","tier":"Medium","id":"534","task":"Defeat all three Moons in one run by only attacking with a Dragon Scimitar.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Back to Our Roots',
        fullurl: 'https://oldschool.runescape.wiki/w/Back_to_Our_Roots',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Back to the Wall': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Obor","type":"Mechanical","name":"Back to the Wall","tier":"Medium","id":"132","task":"Kill Obor without being pushed back more than one square by his knockback attack.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Back to the Wall',
        fullurl: 'https://oldschool.runescape.wiki/w/Back_to_the_Wall',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Barrows Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Barrows","type":"Kill Count","name":"Barrows Champion","tier":"Medium","id":"25","task":"Open the Barrows chest 25 times.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Barrows Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Barrows_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Barrows Novice': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Barrows","type":"Kill Count","name":"Barrows Novice","tier":"Easy","id":"24","task":"Open the Barrows chest 10 times.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Barrows Novice',
        fullurl: 'https://oldschool.runescape.wiki/w/Barrows_Novice',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Betrayal: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Moons of Peril","type":"Restriction","name":"Betrayal","tier":"Hard","id":"533","task":"Defeat a Moon using its associated weapon drop.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Betrayal',
        fullurl: 'https://oldschool.runescape.wiki/w/Betrayal',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Better get movin'": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Mechanical","name":"Better get movin\'","tier":"Master","id":"459","task":"Defeat Elidinis\' Warden in phase three of the Wardens fight with \'Aerial Assault\', \'Stay vigilant\' and \'Insanity\' invocations activated and without dying yourself.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: "Better get movin'",
        fullurl: 'https://oldschool.runescape.wiki/w/Better_get_movin%27',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Big, Black and Fiery': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Black Dragon","type":"Kill Count","name":"Big, Black and Fiery","tier":"Easy","id":"32","task":"Kill a Black Dragon.","leagueRegion":"Asgarnia,Kandarin,Misthalin,Wilderness"}',
          ],
        },
        fulltext: 'Big, Black and Fiery',
        fullurl: 'https://oldschool.runescape.wiki/w/Big,_Black_and_Fiery',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Blind Spot': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Perfection","name":"Blind Spot","tier":"Master","id":"319","task":"Kill Tekton without taking any damage.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Blind Spot',
        fullurl: 'https://oldschool.runescape.wiki/w/Blind_Spot',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Blizzard Dodger': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Restriction","name":"Blizzard Dodger","tier":"Elite","id":"320","task":"Receive kill-credit for the Ice Demon without activating the Protect from Range prayer.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Blizzard Dodger',
        fullurl: 'https://oldschool.runescape.wiki/w/Blizzard_Dodger',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Brutal, Big, Black and Firey': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Brutal Black Dragon","type":"Kill Count","name":"Brutal, Big, Black and Firey","tier":"Medium","id":"34","task":"Kill a Brutal Black Dragon.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Brutal, Big, Black and Firey',
        fullurl:
          'https://oldschool.runescape.wiki/w/Brutal,_Big,_Black_and_Firey',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Bryophyta Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Bryophyta","type":"Kill Count","name":"Bryophyta Champion","tier":"Medium","id":"36","task":"Kill Bryophyta 5 times.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Bryophyta Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Bryophyta_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Bryophyta Novice': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Bryophyta","type":"Kill Count","name":"Bryophyta Novice","tier":"Easy","id":"35","task":"Kill Bryophyta once.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Bryophyta Novice',
        fullurl: 'https://oldschool.runescape.wiki/w/Bryophyta_Novice',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Budget Cutter': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vardorvis","type":"Restriction","name":"Budget Cutter","tier":"Master","id":"493","task":"Kill Vardorvis with gear worth 2m or less in total.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Budget Cutter',
        fullurl: 'https://oldschool.runescape.wiki/w/Budget_Cutter',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Budget Setup': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzKal-Zuk","type":"Restriction","name":"Budget Setup","tier":"Grandmaster","id":"348","task":"Kill Tzkal-Zuk without equipping a Twisted Bow within the Inferno.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Budget Setup',
        fullurl: 'https://oldschool.runescape.wiki/w/Budget_Setup',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'But... Damage': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Restriction","name":"But... Damage","tier":"Master","id":"427","task":"Complete the Tombs of Amascut without anyone in your party wearing or holding any equipment at tier 75 or above.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'But... Damage',
        fullurl: 'https://oldschool.runescape.wiki/w/But..._Damage',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Callisto Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Callisto","type":"Kill Count","name":"Callisto Adept","tier":"Hard","id":"42","task":"Kill Callisto 10 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Callisto Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Callisto_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Callisto Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Callisto","type":"Kill Count","name":"Callisto Veteran","tier":"Elite","id":"43","task":"Kill Callisto 20 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Callisto Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Callisto_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Calm Before the Storm': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tempoross","type":"Mechanical","name":"Calm Before the Storm","tier":"Easy","id":"357","task":"Repair either a mast or a totem pole.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Calm Before the Storm',
        fullurl: 'https://oldschool.runescape.wiki/w/Calm_Before_the_Storm',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Can We Fix It?': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Wintertodt","type":"Perfection","name":"Can We Fix It?","tier":"Medium","id":"283","task":"Subdue the Wintertodt without allowing all 4 braziers to be broken at the same time.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Can We Fix It?',
        fullurl: 'https://oldschool.runescape.wiki/w/Can_We_Fix_It%3F',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Can You Dance?': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Restriction","name":"Can You Dance?","tier":"Master","id":"251","task":"Kill Xarpus without anyone in the team using a ranged or magic weapon.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Can You Dance?',
        fullurl: 'https://oldschool.runescape.wiki/w/Can_You_Dance%3F',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Can't Drain This": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Restriction","name":"Can\'t Drain This","tier":"Master","id":"250","task":"Kill The Maiden of Sugadinti without anyone in the team losing any prayer points.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: "Can't Drain This",
        fullurl: 'https://oldschool.runescape.wiki/w/Can%27t_Drain_This',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Can't Escape": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phantom Muspah","type":"Restriction","name":"Can\'t Escape","tier":"Elite","id":"473","task":"Kill the Phantom Muspah without running.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: "Can't Escape",
        fullurl: 'https://oldschool.runescape.wiki/w/Can%27t_Escape',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Can't Touch Me": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Barrows","type":"Mechanical","name":"Can\'t Touch Me","tier":"Medium","id":"26","task":"Kill Dharok, Verac, Torag and Guthan without letting them attack you with melee.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: "Can't Touch Me",
        fullurl: 'https://oldschool.runescape.wiki/w/Can%27t_Touch_Me',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Can't Wake Up": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phosani\'s Nightmare","type":"Stamina","name":"Can\'t Wake Up","tier":"Grandmaster","id":"409","task":"Kill Phosani\'s Nightmare 5 times in a row without leaving Phosani\'s Dream.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: "Can't Wake Up",
        fullurl: 'https://oldschool.runescape.wiki/w/Can%27t_Wake_Up',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Cerberus Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Cerberus","type":"Kill Count","name":"Cerberus Master","tier":"Master","id":"52","task":"Kill Cerberus 150 times.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Cerberus Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Cerberus_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Cerberus Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Cerberus","type":"Kill Count","name":"Cerberus Veteran","tier":"Elite","id":"51","task":"Kill Cerberus 75 times.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Cerberus Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Cerberus_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chally Time': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Entry Mode","type":"Mechanical","name":"Chally Time","tier":"Elite","id":"389","task":"Defeat the Pestilent Bloat in the Theatre of Blood: Entry Mode by using a crystal halberd special attack as your final attack.","leagueRegion":"Morytania&Kandarin&Tirannwn"}',
          ],
        },
        fulltext: 'Chally Time',
        fullurl: 'https://oldschool.runescape.wiki/w/Chally_Time',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric (5-Scale) Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Speed","name":"Chambers of Xeric (5-Scale) Speed-Chaser","tier":"Master","id":"324","task":"Complete a Chambers of Xeric (5-scale) in less than 15 minutes.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric (5-Scale) Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Chambers_of_Xeric_(5-Scale)_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric (5-Scale) Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Speed","name":"Chambers of Xeric (5-Scale) Speed-Runner","tier":"Grandmaster","id":"325","task":"Complete a Chambers of Xeric (5-scale) in less than 12 minutes and 30 seconds.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric (5-Scale) Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Chambers_of_Xeric_(5-Scale)_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric (Solo) Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Speed","name":"Chambers of Xeric (Solo) Speed-Chaser","tier":"Master","id":"322","task":"Complete a Chambers of Xeric (Solo) in less than 21 minutes.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric (Solo) Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Chambers_of_Xeric_(Solo)_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric (Solo) Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Speed","name":"Chambers of Xeric (Solo) Speed-Runner","tier":"Grandmaster","id":"323","task":"Complete a Chambers of Xeric (Solo) in less than 17 minutes.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric (Solo) Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Chambers_of_Xeric_(Solo)_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric (Trio) Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Speed","name":"Chambers of Xeric (Trio) Speed-Chaser","tier":"Master","id":"326","task":"Complete a Chambers of Xeric (Trio) in less than 16 minutes and 30 seconds.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric (Trio) Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Chambers_of_Xeric_(Trio)_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric (Trio) Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Speed","name":"Chambers of Xeric (Trio) Speed-Runner","tier":"Grandmaster","id":"327","task":"Complete a Chambers of Xeric (Trio) in less than 14 minutes and 30 seconds.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric (Trio) Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Chambers_of_Xeric_(Trio)_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric Grandmaster': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Kill Count","name":"Chambers of Xeric Grandmaster","tier":"Grandmaster","id":"301","task":"Complete the Chambers of Xeric 150 times.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric Grandmaster',
        fullurl:
          'https://oldschool.runescape.wiki/w/Chambers_of_Xeric_Grandmaster',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Kill Count","name":"Chambers of Xeric Master","tier":"Master","id":"300","task":"Complete the Chambers of Xeric 75 times.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Chambers_of_Xeric_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Kill Count","name":"Chambers of Xeric Veteran","tier":"Elite","id":"299","task":"Complete the Chambers of Xeric 25 times.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Chambers_of_Xeric_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric: CM (5-Scale) Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric: Challenge Mode","type":"Speed","name":"Chambers of Xeric: CM (5-Scale) Speed-Chaser","tier":"Master","id":"295","task":"Complete a Chambers of Xeric: Challenge Mode (5-scale) in less than 30 minutes.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric: CM (5-Scale) Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Chambers_of_Xeric:_CM_(5-Scale)_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric: CM (5-Scale) Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric: Challenge Mode","type":"Speed","name":"Chambers of Xeric: CM (5-Scale) Speed-Runner","tier":"Grandmaster","id":"296","task":"Complete a Chambers of Xeric: Challenge Mode (5-scale) in less than 25 minutes.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric: CM (5-Scale) Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Chambers_of_Xeric:_CM_(5-Scale)_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric: CM (Solo) Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric: Challenge Mode","type":"Speed","name":"Chambers of Xeric: CM (Solo) Speed-Chaser","tier":"Master","id":"293","task":"Complete a Chambers of Xeric: Challenge Mode (Solo) in less than 45 minutes.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric: CM (Solo) Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Chambers_of_Xeric:_CM_(Solo)_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric: CM (Solo) Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric: Challenge Mode","type":"Speed","name":"Chambers of Xeric: CM (Solo) Speed-Runner","tier":"Grandmaster","id":"294","task":"Complete a Chambers of Xeric: Challenge Mode (Solo) in less than 38 minutes and 30 seconds.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric: CM (Solo) Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Chambers_of_Xeric:_CM_(Solo)_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric: CM (Trio) Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric: Challenge Mode","type":"Speed","name":"Chambers of Xeric: CM (Trio) Speed-Chaser","tier":"Master","id":"297","task":"Complete a Chambers of Xeric: Challenge Mode (Trio) in less than 35 minutes.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric: CM (Trio) Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Chambers_of_Xeric:_CM_(Trio)_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric: CM (Trio) Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric: Challenge Mode","type":"Speed","name":"Chambers of Xeric: CM (Trio) Speed-Runner","tier":"Grandmaster","id":"298","task":"Complete a Chambers of Xeric: Challenge Mode (Trio) in less than 27 minutes.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric: CM (Trio) Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Chambers_of_Xeric:_CM_(Trio)_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric: CM Grandmaster': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric: Challenge Mode","type":"Kill Count","name":"Chambers of Xeric: CM Grandmaster","tier":"Grandmaster","id":"289","task":"Complete the Chambers of Xeric: Challenge Mode 25 times.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric: CM Grandmaster',
        fullurl:
          'https://oldschool.runescape.wiki/w/Chambers_of_Xeric:_CM_Grandmaster',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chambers of Xeric: CM Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric: Challenge Mode","type":"Kill Count","name":"Chambers of Xeric: CM Master","tier":"Master","id":"288","task":"Complete the Chambers of Xeric: Challenge Mode 10 times.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Chambers of Xeric: CM Master',
        fullurl:
          'https://oldschool.runescape.wiki/w/Chambers_of_Xeric:_CM_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chaos Elemental Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chaos Elemental","type":"Kill Count","name":"Chaos Elemental Adept","tier":"Hard","id":"57","task":"Kill the Chaos Elemental 10 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Chaos Elemental Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Chaos_Elemental_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chaos Elemental Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chaos Elemental","type":"Kill Count","name":"Chaos Elemental Veteran","tier":"Elite","id":"58","task":"Kill the Chaos Elemental 25 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Chaos Elemental Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Chaos_Elemental_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chaos Fanatic Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chaos Fanatic","type":"Kill Count","name":"Chaos Fanatic Adept","tier":"Hard","id":"62","task":"Kill the Chaos Fanatic 25 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Chaos Fanatic Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Chaos_Fanatic_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chaos Fanatic Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chaos Fanatic","type":"Kill Count","name":"Chaos Fanatic Champion","tier":"Medium","id":"61","task":"Kill the Chaos Fanatic 10 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Chaos Fanatic Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Chaos_Fanatic_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chicken Killer': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corporeal Beast","type":"Restriction","name":"Chicken Killer","tier":"Elite","id":"69","task":"Kill the Corporeal Beast solo.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Chicken Killer',
        fullurl: 'https://oldschool.runescape.wiki/w/Chicken_Killer',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Chitin Penetrator': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kalphite Queen","type":"Mechanical","name":"Chitin Penetrator","tier":"Hard","id":"159","task":"Kill the Kalphite Queen while her defence was last lowered by you.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Chitin Penetrator',
        fullurl: 'https://oldschool.runescape.wiki/w/Chitin_Penetrator',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Chompington: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Mechanical","name":"Chompington","tier":"Master","id":"428","task":"Defeat Zebak using only melee attacks and without dying yourself.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Chompington',
        fullurl: 'https://oldschool.runescape.wiki/w/Chompington',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Claw Clipper': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"King Black Dragon","type":"Mechanical","name":"Claw Clipper","tier":"Medium","id":"164","task":"Kill the King Black Dragon with the Protect from Melee prayer activated.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Claw Clipper',
        fullurl: 'https://oldschool.runescape.wiki/w/Claw_Clipper',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Cold Feet': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Duke Sucellus","type":"Restriction","name":"Cold Feet","tier":"Master","id":"519","task":"Kill Duke Sucellus without taking any avoidable damage, whilst also never running."}',
          ],
        },
        fulltext: 'Cold Feet',
        fullurl: 'https://oldschool.runescape.wiki/w/Cold_Feet',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Collateral Damage': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kree\'arra","type":"Mechanical","name":"Collateral Damage","tier":"Master","id":"11","task":"Kill Kree\'arra in a private instance without ever attacking him directly.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Collateral Damage',
        fullurl: 'https://oldschool.runescape.wiki/w/Collateral_Damage',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Colosseum Grand Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Fortis Colosseum","type":"Kill Count","name":"Colosseum Grand Champion","tier":"Grandmaster","id":"539","task":"Defeat Sol Heredit 10 times.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Colosseum Grand Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Colosseum_Grand_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Colosseum Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Fortis Colosseum","type":"Speed","name":"Colosseum Speed-Chaser","tier":"Master","id":"549","task":"Complete the Colosseum with a total time of 28:00 or less.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Colosseum Speed-Chaser',
        fullurl: 'https://oldschool.runescape.wiki/w/Colosseum_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Colosseum Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Fortis Colosseum","type":"Speed","name":"Colosseum Speed-Runner","tier":"Grandmaster","id":"550","task":"Complete the Colosseum with a total time of 24:00 or less.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Colosseum Speed-Runner',
        fullurl: 'https://oldschool.runescape.wiki/w/Colosseum_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Commander Showdown': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Commander Zilyana","type":"Mechanical","name":"Commander Showdown","tier":"Hard","id":"213","task":"Finish off Commander Zilyana while all of her bodyguards are dead.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Commander Showdown',
        fullurl: 'https://oldschool.runescape.wiki/w/Commander_Showdown',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Commander Zilyana Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Commander Zilyana","type":"Kill Count","name":"Commander Zilyana Adept","tier":"Hard","id":"211","task":"Kill Commander Zilyana 50 times.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Commander Zilyana Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Commander_Zilyana_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Commander Zilyana Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Commander Zilyana","type":"Kill Count","name":"Commander Zilyana Veteran","tier":"Elite","id":"212","task":"Kill Commander Zilyana 100 times.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Commander Zilyana Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Commander_Zilyana_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Confident Raider': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Entry Mode","type":"Restriction","name":"Confident Raider","tier":"Hard","id":"465","task":"Complete a Tombs of Amascut raid at level 100 or above.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Confident Raider',
        fullurl: 'https://oldschool.runescape.wiki/w/Confident_Raider',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Contain this!': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Nex","type":"Mechanical","name":"Contain this!","tier":"Master","id":"414","task":"Kill Nex without anyone taking damage from any Ice special attack.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Contain this!',
        fullurl: 'https://oldschool.runescape.wiki/w/Contain_this!',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Corporeal Beast Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corporeal Beast","type":"Kill Count","name":"Corporeal Beast Master","tier":"Master","id":"66","task":"Kill the Corporeal Beast 50 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Corporeal Beast Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Corporeal_Beast_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Corporeal Beast Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corporeal Beast","type":"Kill Count","name":"Corporeal Beast Veteran","tier":"Elite","id":"65","task":"Kill the Corporeal Beast 25 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Corporeal Beast Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Corporeal_Beast_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Corrupted Gauntlet Grandmaster': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corrupted Hunllef","type":"Kill Count","name":"Corrupted Gauntlet Grandmaster","tier":"Grandmaster","id":"100","task":"Complete the Corrupted Gauntlet 50 times.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Corrupted Gauntlet Grandmaster',
        fullurl:
          'https://oldschool.runescape.wiki/w/Corrupted_Gauntlet_Grandmaster',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Corrupted Gauntlet Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corrupted Hunllef","type":"Kill Count","name":"Corrupted Gauntlet Master","tier":"Master","id":"99","task":"Complete the Corrupted Gauntlet 10 times.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Corrupted Gauntlet Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Corrupted_Gauntlet_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Corrupted Gauntlet Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corrupted Hunllef","type":"Speed","name":"Corrupted Gauntlet Speed-Chaser","tier":"Master","id":"107","task":"Complete a Corrupted Gauntlet in less than 7 minutes and 30 seconds.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Corrupted Gauntlet Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Corrupted_Gauntlet_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Corrupted Gauntlet Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corrupted Hunllef","type":"Speed","name":"Corrupted Gauntlet Speed-Runner","tier":"Grandmaster","id":"108","task":"Complete a Corrupted Gauntlet in less than 6 minutes and 30 seconds.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Corrupted Gauntlet Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Corrupted_Gauntlet_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Corrupted Gauntlet Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corrupted Hunllef","type":"Kill Count","name":"Corrupted Gauntlet Veteran","tier":"Elite","id":"98","task":"Complete the Corrupted Gauntlet 5 times.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Corrupted Gauntlet Veteran',
        fullurl:
          'https://oldschool.runescape.wiki/w/Corrupted_Gauntlet_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Corrupted Warrior': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corrupted Hunllef","type":"Restriction","name":"Corrupted Warrior","tier":"Master","id":"105","task":"Kill the Corrupted Hunllef with a full set of perfected corrupted armour equipped.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Corrupted Warrior',
        fullurl: 'https://oldschool.runescape.wiki/w/Corrupted_Warrior',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Cosy: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Wintertodt","type":"Restriction","name":"Cosy","tier":"Easy","id":"285","task":"Subdue the Wintertodt with four pieces of warm equipment equipped.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Cosy',
        fullurl: 'https://oldschool.runescape.wiki/w/Cosy',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Crazy Archaeologist Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Crazy Archaeologist","type":"Kill Count","name":"Crazy Archaeologist Adept","tier":"Hard","id":"71","task":"Kill the Crazy Archaeologist 25 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Crazy Archaeologist Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Crazy_Archaeologist_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Crazy Archaeologist Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Crazy Archaeologist","type":"Kill Count","name":"Crazy Archaeologist Champion","tier":"Medium","id":"70","task":"Kill the Crazy Archaeologist 10 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Crazy Archaeologist Champion',
        fullurl:
          'https://oldschool.runescape.wiki/w/Crazy_Archaeologist_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Crush Hour': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phosani\'s Nightmare","type":"Mechanical","name":"Crush Hour","tier":"Master","id":"406","task":"Kill Phosani\'s Nightmare while killing every parasite and husk in one hit.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Crush Hour',
        fullurl: 'https://oldschool.runescape.wiki/w/Crush_Hour',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Cryo No More': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Perfection","name":"Cryo No More","tier":"Elite","id":"316","task":"Receive kill-credit for the Ice Demon without taking any damage.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Cryo No More',
        fullurl: 'https://oldschool.runescape.wiki/w/Cryo_No_More',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Crystalline Warrior': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Crystalline Hunllef","type":"Restriction","name":"Crystalline Warrior","tier":"Elite","id":"115","task":"Kill the Crystalline Hunllef with a full set of perfected armour equipped.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Crystalline Warrior',
        fullurl: 'https://oldschool.runescape.wiki/w/Crystalline_Warrior',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Dagannoth Prime Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Dagannoth Prime","type":"Kill Count","name":"Dagannoth Prime Adept","tier":"Hard","id":"198","task":"Kill Dagannoth Prime 25 times.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Dagannoth Prime Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Dagannoth_Prime_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Dagannoth Prime Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Dagannoth Prime","type":"Kill Count","name":"Dagannoth Prime Champion","tier":"Medium","id":"197","task":"Kill Dagannoth Prime 10 times.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Dagannoth Prime Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Dagannoth_Prime_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Dagannoth Rex Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Dagannoth Rex","type":"Kill Count","name":"Dagannoth Rex Adept","tier":"Hard","id":"202","task":"Kill Dagannoth Rex 25 times.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Dagannoth Rex Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Dagannoth_Rex_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Dagannoth Rex Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Dagannoth Rex","type":"Kill Count","name":"Dagannoth Rex Champion","tier":"Medium","id":"201","task":"Kill Dagannoth Rex 10 times.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Dagannoth Rex Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Dagannoth_Rex_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Dagannoth Supreme Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Dagannoth Supreme","type":"Kill Count","name":"Dagannoth Supreme Adept","tier":"Hard","id":"234","task":"Kill Dagannoth Supreme 25 times.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Dagannoth Supreme Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Dagannoth_Supreme_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Dagannoth Supreme Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Dagannoth Supreme","type":"Kill Count","name":"Dagannoth Supreme Champion","tier":"Medium","id":"233","task":"Kill Dagannoth Supreme 10 times.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Dagannoth Supreme Champion',
        fullurl:
          'https://oldschool.runescape.wiki/w/Dagannoth_Supreme_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Dancing with Statues': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Perfection","name":"Dancing with Statues","tier":"Elite","id":"311","task":"Receive kill-credit for a Stone Guardian without taking damage from falling rocks.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Dancing with Statues',
        fullurl: 'https://oldschool.runescape.wiki/w/Dancing_with_Statues',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Dark Memories': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Whisperer","type":"Restriction","name":"Dark Memories","tier":"Grandmaster","id":"502","task":"Kill the Whisperer whilst spending less than 6 seconds in the pre-enrage shadow realm."}',
          ],
        },
        fulltext: 'Dark Memories',
        fullurl: 'https://oldschool.runescape.wiki/w/Dark_Memories',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Death to the Archer King': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Dagannoth Supreme","type":"Mechanical","name":"Death to the Archer King","tier":"Elite","id":"235","task":"Kill Dagannoth Supreme whilst under attack by Dagannoth Prime and Dagannoth Rex.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Death to the Archer King',
        fullurl: 'https://oldschool.runescape.wiki/w/Death_to_the_Archer_King',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Death to the Seer King': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Dagannoth Prime","type":"Mechanical","name":"Death to the Seer King","tier":"Elite","id":"199","task":"Kill Dagannoth Prime whilst under attack by Dagannoth Supreme and Dagannoth Rex.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Death to the Seer King',
        fullurl: 'https://oldschool.runescape.wiki/w/Death_to_the_Seer_King',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Death to the Warrior King': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Dagannoth Rex","type":"Mechanical","name":"Death to the Warrior King","tier":"Elite","id":"203","task":"Kill Dagannoth Rex whilst under attack by Dagannoth Supreme and Dagannoth Prime.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Death to the Warrior King',
        fullurl: 'https://oldschool.runescape.wiki/w/Death_to_the_Warrior_King',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Defence Doesn't Matter": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Crystalline Hunllef","type":"Restriction","name":"Defence Doesn\'t Matter","tier":"Master","id":"113","task":"Kill the Crystalline Hunllef without making any armour within the Gauntlet.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: "Defence Doesn't Matter",
        fullurl: 'https://oldschool.runescape.wiki/w/Defence_Doesn%27t_Matter',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Defence Doesn't Matter II": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corrupted Hunllef","type":"Restriction","name":"Defence Doesn\'t Matter II","tier":"Master","id":"103","task":"Kill the Corrupted Hunllef without making any armour within the Corrupted Gauntlet.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: "Defence Doesn't Matter II",
        fullurl:
          'https://oldschool.runescape.wiki/w/Defence_Doesn%27t_Matter_II',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Defence Matters': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"General Graardor","type":"Perfection","name":"Defence Matters","tier":"Grandmaster","id":"21","task":"Kill General Graardor 2 times consecutively in a private instance without taking any damage from his bodyguards.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Defence Matters',
        fullurl: 'https://oldschool.runescape.wiki/w/Defence_Matters',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Defence? What Defence?': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Barrows","type":"Restriction","name":"Defence? What Defence?","tier":"Easy","id":"28","task":"Kill any Barrows Brother using only magical damage.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Defence? What Defence?',
        fullurl:
          'https://oldschool.runescape.wiki/w/Defence%3F_What_Defence%3F',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Demon Evasion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Skotizo","type":"Perfection","name":"Demon Evasion","tier":"Elite","id":"47","task":"Kill Skotizo without taking any damage.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Demon Evasion',
        fullurl: 'https://oldschool.runescape.wiki/w/Demon_Evasion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Demon Whisperer': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"K\'ril Tsutsaroth","type":"Perfection","name":"Demon Whisperer","tier":"Grandmaster","id":"338","task":"Kill K\'ril Tsutsaroth in a private instance without ever being hit by his bodyguards.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Demon Whisperer',
        fullurl: 'https://oldschool.runescape.wiki/w/Demon_Whisperer',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Demonbane Weaponry': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Skotizo","type":"Restriction","name":"Demonbane Weaponry","tier":"Medium","id":"48","task":"Kill Skotizo with a demonbane weapon equipped.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Demonbane Weaponry',
        fullurl: 'https://oldschool.runescape.wiki/w/Demonbane_Weaponry',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Demonbane Weaponry II': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"K\'ril Tsutsaroth","type":"Restriction","name":"Demonbane Weaponry II","tier":"Hard","id":"339","task":"Finish off K\'ril Tsutsaroth with a demonbane weapon.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Demonbane Weaponry II',
        fullurl: 'https://oldschool.runescape.wiki/w/Demonbane_Weaponry_II',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Demonic Defence': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"K\'ril Tsutsaroth","type":"Perfection","name":"Demonic Defence","tier":"Elite","id":"337","task":"Kill K\'ril Tsutsaroth in a private instance without taking any of his melee hits.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Demonic Defence',
        fullurl: 'https://oldschool.runescape.wiki/w/Demonic_Defence',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Demonic Rebound': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Abyssal Sire","type":"Mechanical","name":"Demonic Rebound","tier":"Elite","id":"6","task":"Use the Vengeance spell to reflect the damage from the Abyssal Sire\'s explosion back to him.","leagueRegion":"Misthalin&Fremennik"}',
          ],
        },
        fulltext: 'Demonic Rebound',
        fullurl: 'https://oldschool.runescape.wiki/w/Demonic_Rebound',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Demonic Showdown': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"K\'ril Tsutsaroth","type":"Mechanical","name":"Demonic Showdown","tier":"Hard","id":"335","task":"Finish off K\'ril Tsutsaroth whilst all of his bodyguards are dead.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Demonic Showdown',
        fullurl: 'https://oldschool.runescape.wiki/w/Demonic_Showdown',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Demonic Weakening': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Skotizo","type":"Mechanical","name":"Demonic Weakening","tier":"Medium","id":"46","task":"Kill Skotizo with no altars active.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Demonic Weakening',
        fullurl: 'https://oldschool.runescape.wiki/w/Demonic_Weakening',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Denied: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Fortis Colosseum","type":"Mechanical","name":"Denied","tier":"Elite","id":"545","task":"Complete Wave 7 without the Minotaur ever healing other enemies.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Denied',
        fullurl: 'https://oldschool.runescape.wiki/w/Denied',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Denying the Healers': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzTok-Jad","type":"Mechanical","name":"Denying the Healers","tier":"Master","id":"150","task":"Complete the Fight caves without letting any of the Yt-MejKot heal.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Denying the Healers',
        fullurl: 'https://oldschool.runescape.wiki/w/Denying_the_Healers',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Denying the Healers II': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzTok-Jad","type":"Mechanical","name":"Denying the Healers II","tier":"Grandmaster","id":"151","task":"Complete the Fight Caves without TzTok-Jad being healed by a Yt-HurKot.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Denying the Healers II',
        fullurl: 'https://oldschool.runescape.wiki/w/Denying_the_Healers_II',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Deranged Archaeologist Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Deranged Archaeologist","type":"Kill Count","name":"Deranged Archaeologist Champion","tier":"Medium","id":"77","task":"Kill the Deranged Archaeologist 25 times.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Deranged Archaeologist Champion',
        fullurl:
          'https://oldschool.runescape.wiki/w/Deranged_Archaeologist_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Deranged Archaeologist Novice': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Deranged Archaeologist","type":"Kill Count","name":"Deranged Archaeologist Novice","tier":"Easy","id":"76","task":"Kill the Deranged Archaeologist 10 times.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Deranged Archaeologist Novice',
        fullurl:
          'https://oldschool.runescape.wiki/w/Deranged_Archaeologist_Novice',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Dodging the Dragon': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vorkath","type":"Perfection","name":"Dodging the Dragon","tier":"Master","id":"272","task":"Kill Vorkath 5 times without taking any damage from his special attacks and without leaving his area.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Dodging the Dragon',
        fullurl: 'https://oldschool.runescape.wiki/w/Dodging_the_Dragon',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Doesn't bug me": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Mechanical","name":"Doesn\'t bug me","tier":"Master","id":"456","task":"Defeat Kephri with all Kephri invocations activated and the path levelled up to at least four, without dying yourself.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: "Doesn't bug me",
        fullurl: 'https://oldschool.runescape.wiki/w/Doesn%27t_bug_me',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Don't Flame Me": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Alchemical Hydra","type":"Mechanical","name":"Don\'t Flame Me","tier":"Master","id":"139","task":"Kill the Alchemical Hydra without being hit by the flame wall attack.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: "Don't Flame Me",
        fullurl: 'https://oldschool.runescape.wiki/w/Don%27t_Flame_Me',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Don't Look at Me!": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Entry Mode","type":"Mechanical","name":"Don\'t Look at Me!","tier":"Elite","id":"392","task":"Kill Xarpus in the Theatre of Blood: Entry Mode without him reflecting any damage to anyone.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: "Don't Look at Me!",
        fullurl: 'https://oldschool.runescape.wiki/w/Don%27t_Look_at_Me!',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Don't Look at the Eclipse": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Grotesque Guardians","type":"Mechanical","name":"Don\'t Look at the Eclipse","tier":"Hard","id":"84","task":"Kill the Grotesque Guardians without taking damage from Dusk\'s blinding attack.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: "Don't Look at the Eclipse",
        fullurl:
          'https://oldschool.runescape.wiki/w/Don%27t_Look_at_the_Eclipse',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Don't Stop Moving": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Abyssal Sire","type":"Perfection","name":"Don\'t Stop Moving","tier":"Hard","id":"7","task":"Kill the Abyssal Sire without taking damage from any miasma pools.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: "Don't Stop Moving",
        fullurl: 'https://oldschool.runescape.wiki/w/Don%27t_Stop_Moving',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Don't Whip Me": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Abyssal Sire","type":"Mechanical","name":"Don\'t Whip Me","tier":"Hard","id":"5","task":"Kill the Abyssal Sire without being hit by any external tentacles.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: "Don't Whip Me",
        fullurl: 'https://oldschool.runescape.wiki/w/Don%27t_Whip_Me',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Done before Dusk': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Grotesque Guardians","type":"Mechanical","name":"Done before Dusk","tier":"Elite","id":"89","task":"Kill the Grotesque Guardians before Dusk uses his prison attack for a second time.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Done before Dusk',
        fullurl: 'https://oldschool.runescape.wiki/w/Done_before_Dusk',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Down Do Specs': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Mechanical","name":"Down Do Specs","tier":"Elite","id":"458","task":"Defeat the Wardens after staggering the boss a maximum of twice during phase two, without dying yourself.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Down Do Specs',
        fullurl: 'https://oldschool.runescape.wiki/w/Down_Do_Specs',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Dreamland Express': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phosani\'s Nightmare","type":"Mechanical","name":"Dreamland Express","tier":"Master","id":"408","task":"Kill Phosani\'s Nightmare without a sleepwalker reaching her during her desperation phase.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Dreamland Express',
        fullurl: 'https://oldschool.runescape.wiki/w/Dreamland_Express',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Dress Like You Mean It': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tempoross","type":"Restriction","name":"Dress Like You Mean It","tier":"Hard","id":"355","task":"Subdue Tempoross while wearing any variation of the angler outfit.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Dress Like You Mean It',
        fullurl: 'https://oldschool.runescape.wiki/w/Dress_Like_You_Mean_It',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Dropped the ball': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Mechanical","name":"Dropped the ball","tier":"Elite","id":"449","task":"Defeat Akkha without dropping any materialising orbs and without dying yourself.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Dropped the ball',
        fullurl: 'https://oldschool.runescape.wiki/w/Dropped_the_ball',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Duke Sucellus Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Duke Sucellus","type":"Kill Count","name":"Duke Sucellus Adept","tier":"Elite","id":"515","task":"Kill Duke Sucellus once."}',
          ],
        },
        fulltext: 'Duke Sucellus Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Duke_Sucellus_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Duke Sucellus Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Duke Sucellus","type":"Kill Count","name":"Duke Sucellus Master","tier":"Master","id":"516","task":"Kill Duke Sucellus 50 times."}',
          ],
        },
        fulltext: 'Duke Sucellus Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Duke_Sucellus_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Duke Sucellus Sleeper': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Duke Sucellus","type":"Kill Count","name":"Duke Sucellus Sleeper","tier":"Grandmaster","id":"517","task":"Kill Awakened Duke Sucellus."}',
          ],
        },
        fulltext: 'Duke Sucellus Sleeper',
        fullurl: 'https://oldschool.runescape.wiki/w/Duke_Sucellus_Sleeper',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Duke Sucellus Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Duke Sucellus","type":"Speed","name":"Duke Sucellus Speed-Chaser","tier":"Master","id":"513","task":"Kill Duke Sucellus in less than 1:35 minutes without a slayer task."}',
          ],
        },
        fulltext: 'Duke Sucellus Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Duke_Sucellus_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Duke Sucellus Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Duke Sucellus","type":"Speed","name":"Duke Sucellus Speed-Runner","tier":"Grandmaster","id":"514","task":"Kill Duke Sucellus in less than 1:25 minutes without a slayer task."}',
          ],
        },
        fulltext: 'Duke Sucellus Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Duke_Sucellus_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Duke Sucellus Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Duke Sucellus","type":"Speed","name":"Duke Sucellus Speed-Trialist","tier":"Elite","id":"512","task":"Kill Duke Sucellus in less than 1:45 minutes without a slayer task."}',
          ],
        },
        fulltext: 'Duke Sucellus Speed-Trialist',
        fullurl:
          'https://oldschool.runescape.wiki/w/Duke_Sucellus_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Dust Seeker': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric: Challenge Mode","type":"Speed","name":"Dust Seeker","tier":"Elite","id":"292","task":"Complete a Chambers of Xeric Challenge mode raid in the target time.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Dust Seeker',
        fullurl: 'https://oldschool.runescape.wiki/w/Dust_Seeker',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Combat Achievements/Easy': {
        printouts: {
          'Combat Achievement JSON': [],
        },
        fulltext: 'Combat Achievements/Easy',
        fullurl: 'https://oldschool.runescape.wiki/w/Combat_Achievements/Easy',
        namespace: 0,
        exists: '1',
        displaytitle: 'Easy Combat Achievements',
      },
      'Efficient Pest Control': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Scurrius","type":"Mechanical","name":"Efficient Pest Control","tier":"Medium","id":"525","task":"Kill 6 Giant Rats within Scurrius\' lair in 3 seconds.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Efficient Pest Control',
        fullurl: 'https://oldschool.runescape.wiki/w/Efficient_Pest_Control',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Egniol Diet': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Crystalline Hunllef","type":"Restriction","name":"Egniol Diet","tier":"Elite","id":"114","task":"Kill the Crystalline Hunllef without making an egniol potion within the Gauntlet.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Egniol Diet',
        fullurl: 'https://oldschool.runescape.wiki/w/Egniol_Diet',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Egniol Diet II': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corrupted Hunllef","type":"Restriction","name":"Egniol Diet II","tier":"Grandmaster","id":"104","task":"Kill the Corrupted Hunllef without making an egniol potion within the Corrupted Gauntlet.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Egniol Diet II',
        fullurl: 'https://oldschool.runescape.wiki/w/Egniol_Diet_II',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Combat Achievements/Elite': {
        printouts: {
          'Combat Achievement JSON': [],
        },
        fulltext: 'Combat Achievements/Elite',
        fullurl: 'https://oldschool.runescape.wiki/w/Combat_Achievements/Elite',
        namespace: 0,
        exists: '1',
        displaytitle: 'Elite Combat Achievements',
      },
      'Essence Farmer': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phantom Muspah","type":"Stamina","name":"Essence Farmer","tier":"Master","id":"474","task":"Kill the Phantom Muspah 10 times in one trip.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Essence Farmer',
        fullurl: 'https://oldschool.runescape.wiki/w/Essence_Farmer',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Expert Tomb Explorer': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Kill Count","name":"Expert Tomb Explorer","tier":"Elite","id":"469","task":"Complete the Tombs of Amascut (Expert mode) once.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Expert Tomb Explorer',
        fullurl: 'https://oldschool.runescape.wiki/w/Expert_Tomb_Explorer',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Expert Tomb Looter': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Kill Count","name":"Expert Tomb Looter","tier":"Master","id":"470","task":"Complete the Tombs of Amascut (Expert mode) 25 times.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Expert Tomb Looter',
        fullurl: 'https://oldschool.runescape.wiki/w/Expert_Tomb_Looter',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Expert Tomb Raider': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Kill Count","name":"Expert Tomb Raider","tier":"Grandmaster","id":"471","task":"Complete the Tombs of Amascut (Expert mode) 50 times.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Expert Tomb Raider',
        fullurl: 'https://oldschool.runescape.wiki/w/Expert_Tomb_Raider',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Explosion!': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Nightmare","type":"Mechanical","name":"Explosion!","tier":"Elite","id":"187","task":"Kill two Husks at the same time.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Explosion!',
        fullurl: 'https://oldschool.runescape.wiki/w/Explosion!',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Extended Encounter': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vorkath","type":"Stamina","name":"Extended Encounter","tier":"Master","id":"278","task":"Kill Vorkath 10 times without leaving his area.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Extended Encounter',
        fullurl: 'https://oldschool.runescape.wiki/w/Extended_Encounter',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Facing Jad Head-on': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzTok-Jad","type":"Restriction","name":"Facing Jad Head-on","tier":"Elite","id":"153","task":"Complete the Fight Caves with only melee.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Facing Jad Head-on',
        fullurl: 'https://oldschool.runescape.wiki/w/Facing_Jad_Head-on',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Facing Jad Head-on II': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzKal-Zuk","type":"Restriction","name":"Facing Jad Head-on II","tier":"Grandmaster","id":"350","task":"Kill Tzkal-Zuk without equipping any range or mage weapons before wave 69.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Facing Jad Head-on II',
        fullurl: 'https://oldschool.runescape.wiki/w/Facing_Jad_Head-on_II',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Facing Jad Head-on III': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzHaar-Ket-Rak\'s Challenges","type":"Restriction","name":"Facing Jad Head-on III","tier":"Elite","id":"367","task":"Complete TzHaar-Ket-Rak\'s second challenge with only melee.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Facing Jad Head-on III',
        fullurl: 'https://oldschool.runescape.wiki/w/Facing_Jad_Head-on_III',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Facing Jad Head-on IV': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzHaar-Ket-Rak\'s Challenges","type":"Restriction","name":"Facing Jad Head-on IV","tier":"Master","id":"368","task":"Complete TzHaar-Ket-Rak\'s fourth challenge with only melee.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Facing Jad Head-on IV',
        fullurl: 'https://oldschool.runescape.wiki/w/Facing_Jad_Head-on_IV',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Faithless Crypt Run': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Barrows","type":"Restriction","name":"Faithless Crypt Run","tier":"Hard","id":"30","task":"Kill all six Barrows Brothers and loot the Barrows chest without ever having more than 0 prayer points.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Faithless Crypt Run',
        fullurl: 'https://oldschool.runescape.wiki/w/Faithless_Crypt_Run',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Faithless Encounter': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vorkath","type":"Restriction","name":"Faithless Encounter","tier":"Grandmaster","id":"274","task":"Kill Vorkath without losing any prayer points.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Faithless Encounter',
        fullurl: 'https://oldschool.runescape.wiki/w/Faithless_Encounter',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Fancy feet': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Restriction","name":"Fancy feet","tier":"Master","id":"429","task":"Complete phase three of The Wardens in a group of two or more, using only melee attacks and without dying yourself. The \'Insanity\' invocation must be activated.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Fancy feet',
        fullurl: 'https://oldschool.runescape.wiki/w/Fancy_feet',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Fat of the Land': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Moons of Peril","type":"Stamina","name":"Fat of the Land","tier":"Hard","id":"537","task":"Defeat 30 Moons of Peril bosses without leaving the dungeon.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Fat of the Land',
        fullurl: 'https://oldschool.runescape.wiki/w/Fat_of_the_Land',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Feather Hunter': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kree\'arra","type":"Stamina","name":"Feather Hunter","tier":"Grandmaster","id":"15","task":"Kill Kree\'arra 30 times in a private instance without leaving the room.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Feather Hunter',
        fullurl: 'https://oldschool.runescape.wiki/w/Feather_Hunter',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Fight Caves Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzTok-Jad","type":"Kill Count","name":"Fight Caves Master","tier":"Master","id":"148","task":"Complete the Fight Caves 5 times.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Fight Caves Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Fight_Caves_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Fight Caves Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzTok-Jad","type":"Speed","name":"Fight Caves Speed-Chaser","tier":"Master","id":"155","task":"Complete the Fight Caves in less than 30 minutes.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Fight Caves Speed-Chaser',
        fullurl: 'https://oldschool.runescape.wiki/w/Fight_Caves_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Fight Caves Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzTok-Jad","type":"Speed","name":"Fight Caves Speed-Runner","tier":"Grandmaster","id":"156","task":"Complete the Fight Caves in less than 26 minutes and 30 seconds.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Fight Caves Speed-Runner',
        fullurl: 'https://oldschool.runescape.wiki/w/Fight_Caves_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Fight Caves Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzTok-Jad","type":"Kill Count","name":"Fight Caves Veteran","tier":"Elite","id":"147","task":"Complete the Fight Caves once.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Fight Caves Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Fight_Caves_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Fighting as Intended': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Obor","type":"Restriction","name":"Fighting as Intended","tier":"Easy","id":"134","task":"Kill Obor on a free to play world.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Fighting as Intended',
        fullurl: 'https://oldschool.runescape.wiki/w/Fighting_as_Intended',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Fighting as Intended II': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Bryophyta","type":"Restriction","name":"Fighting as Intended II","tier":"Easy","id":"41","task":"Kill Bryophyta on a free to play world.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Fighting as Intended II',
        fullurl: 'https://oldschool.runescape.wiki/w/Fighting_as_Intended_II',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Finding the Weak Spot': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corporeal Beast","type":"Restriction","name":"Finding the Weak Spot","tier":"Elite","id":"68","task":"Finish off the Corporeal Beast with a Crystal Halberd special attack.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Finding the Weak Spot',
        fullurl: 'https://oldschool.runescape.wiki/w/Finding_the_Weak_Spot',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Fire in the Hole!': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tempoross","type":"Mechanical","name":"Fire in the Hole!","tier":"Easy","id":"360","task":"Attack Tempoross from both sides by loading both cannons on both ships.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Fire in the Hole!',
        fullurl: 'https://oldschool.runescape.wiki/w/Fire_in_the_Hole!',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Fortified: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Moons of Peril","type":"Restriction","name":"Fortified","tier":"Hard","id":"532","task":"Defeat a Moon without consuming any supplies.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Fortified',
        fullurl: 'https://oldschool.runescape.wiki/w/Fortified',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Fragment of Seren Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Fragment of Seren","type":"Speed","name":"Fragment of Seren Speed-Trialist","tier":"Elite","id":"222","task":"Kill The Fragment of Seren in less than 4 minutes.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Fragment of Seren Speed-Trialist',
        fullurl:
          'https://oldschool.runescape.wiki/w/Fragment_of_Seren_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'From Dusk...': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Grotesque Guardians","type":"Stamina","name":"From Dusk...","tier":"Elite","id":"95","task":"Kill the Grotesque Guardians 10 times without leaving the instance.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'From Dusk...',
        fullurl: 'https://oldschool.runescape.wiki/w/From_Dusk...',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'From One King to Another': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Dagannoth Prime","type":"Mechanical","name":"From One King to Another","tier":"Elite","id":"200","task":"Kill Prime using a Rune Thrownaxe special attack, bounced off Dagannoth Rex.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'From One King to Another',
        fullurl: 'https://oldschool.runescape.wiki/w/From_One_King_to_Another',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Furball: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Fortis Colosseum","type":"Perfection","name":"Furball","tier":"Elite","id":"542","task":"Complete Wave 4 without taking avoidable damage from a Manticore.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Furball',
        fullurl: 'https://oldschool.runescape.wiki/w/Furball',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Galvek Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Galvek","type":"Speed","name":"Galvek Speed-Trialist","tier":"Elite","id":"81","task":"Kill Galvek in less than 3 minutes.","leagueRegion":"Kandarin&Fremennik"}',
          ],
        },
        fulltext: 'Galvek Speed-Trialist',
        fullurl: 'https://oldschool.runescape.wiki/w/Galvek_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Gauntlet Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Crystalline Hunllef","type":"Kill Count","name":"Gauntlet Master","tier":"Master","id":"110","task":"Complete the Gauntlet 20 times.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Gauntlet Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Gauntlet_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Gauntlet Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Crystalline Hunllef","type":"Speed","name":"Gauntlet Speed-Chaser","tier":"Master","id":"117","task":"Complete the Gauntlet in less than 5 minutes.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Gauntlet Speed-Chaser',
        fullurl: 'https://oldschool.runescape.wiki/w/Gauntlet_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Gauntlet Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Crystalline Hunllef","type":"Speed","name":"Gauntlet Speed-Runner","tier":"Grandmaster","id":"118","task":"Complete the Gauntlet in less than 4 minutes.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Gauntlet Speed-Runner',
        fullurl: 'https://oldschool.runescape.wiki/w/Gauntlet_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Gauntlet Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Crystalline Hunllef","type":"Kill Count","name":"Gauntlet Veteran","tier":"Elite","id":"109","task":"Complete the Gauntlet 5 times.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Gauntlet Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Gauntlet_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'General Graardor Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"General Graardor","type":"Kill Count","name":"General Graardor Adept","tier":"Hard","id":"16","task":"Kill General Graardor 50 times.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'General Graardor Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/General_Graardor_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'General Graardor Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"General Graardor","type":"Kill Count","name":"General Graardor Veteran","tier":"Elite","id":"17","task":"Kill General Graardor 100 times.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'General Graardor Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/General_Graardor_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'General Showdown': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"General Graardor","type":"Mechanical","name":"General Showdown","tier":"Hard","id":"20","task":"Finish off General Graardor whilst all of his bodyguards are dead.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'General Showdown',
        fullurl: 'https://oldschool.runescape.wiki/w/General_Showdown',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Ghost Buster': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Cerberus","type":"Mechanical","name":"Ghost Buster","tier":"Elite","id":"54","task":"Kill Cerberus after successfully negating 6 or more attacks from Summoned Souls.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Ghost Buster',
        fullurl: 'https://oldschool.runescape.wiki/w/Ghost_Buster',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Giant Mole Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Giant Mole","type":"Kill Count","name":"Giant Mole Champion","tier":"Medium","id":"178","task":"Kill the Giant mole 25 times.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Giant Mole Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Giant_Mole_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Giant Mole Novice': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Giant Mole","type":"Kill Count","name":"Giant Mole Novice","tier":"Easy","id":"177","task":"Kill the Giant Mole 10 times.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Giant Mole Novice',
        fullurl: 'https://oldschool.runescape.wiki/w/Giant_Mole_Novice',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Glough Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Glough","type":"Speed","name":"Glough Speed-Trialist","tier":"Elite","id":"119","task":"Kill Glough in less than 2 minutes and 30 seconds.","leagueRegion":"Kandarin"}',
          ],
        },
        fulltext: 'Glough Speed-Trialist',
        fullurl: 'https://oldschool.runescape.wiki/w/Glough_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Combat Achievements/Grandmaster': {
        printouts: {
          'Combat Achievement JSON': [],
        },
        fulltext: 'Combat Achievements/Grandmaster',
        fullurl:
          'https://oldschool.runescape.wiki/w/Combat_Achievements/Grandmaster',
        namespace: 0,
        exists: '1',
        displaytitle: 'Grandmaster Combat Achievements',
      },
      'Granite Footwork': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Grotesque Guardians","type":"Mechanical","name":"Granite Footwork","tier":"Hard","id":"86","task":"Kill the Grotesque Guardians without taking damage from Dawn\'s rockfall attack.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Granite Footwork',
        fullurl: 'https://oldschool.runescape.wiki/w/Granite_Footwork',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Grotesque Guardians Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Grotesque Guardians","type":"Kill Count","name":"Grotesque Guardians Adept","tier":"Hard","id":"82","task":"Kill the Grotesque Guardians 25 times.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Grotesque Guardians Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Grotesque_Guardians_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Grotesque Guardians Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Grotesque Guardians","type":"Speed","name":"Grotesque Guardians Speed-Chaser","tier":"Master","id":"93","task":"Kill the Grotesque Guardians in less than 1:40 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Grotesque Guardians Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Grotesque_Guardians_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Grotesque Guardians Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Grotesque Guardians","type":"Speed","name":"Grotesque Guardians Speed-Runner","tier":"Grandmaster","id":"94","task":"Kill the Grotesque Guardians in less than 1:20 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Grotesque Guardians Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Grotesque_Guardians_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Grotesque Guardians Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Grotesque Guardians","type":"Speed","name":"Grotesque Guardians Speed-Trialist","tier":"Elite","id":"92","task":"Kill the Grotesque Guardians in less than 2 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Grotesque Guardians Speed-Trialist',
        fullurl:
          'https://oldschool.runescape.wiki/w/Grotesque_Guardians_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Grotesque Guardians Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Grotesque Guardians","type":"Kill Count","name":"Grotesque Guardians Veteran","tier":"Elite","id":"83","task":"Kill the Grotesque Guardians 50 times.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Grotesque Guardians Veteran',
        fullurl:
          'https://oldschool.runescape.wiki/w/Grotesque_Guardians_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Guardians No More': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Scorpia","type":"Restriction","name":"Guardians No More","tier":"Hard","id":"221","task":"Kill Scorpia without killing her guardians.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Guardians No More',
        fullurl: 'https://oldschool.runescape.wiki/w/Guardians_No_More',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Half-Way There': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzKal-Zuk","type":"Kill Count","name":"Half-Way There","tier":"Elite","id":"341","task":"Kill a Jal-Zek within the Inferno.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Half-Way There',
        fullurl: 'https://oldschool.runescape.wiki/w/Half-Way_There',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Handyman: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Wintertodt","type":"Mechanical","name":"Handyman","tier":"Easy","id":"282","task":"Repair a brazier which has been destroyed by the Wintertodt.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Handyman',
        fullurl: 'https://oldschool.runescape.wiki/w/Handyman',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Combat Achievements/Hard': {
        printouts: {
          'Combat Achievement JSON': [],
        },
        fulltext: 'Combat Achievements/Hard',
        fullurl: 'https://oldschool.runescape.wiki/w/Combat_Achievements/Hard',
        namespace: 0,
        exists: '1',
        displaytitle: 'Hard Combat Achievements',
      },
      'Hard Hitter': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Giant Mole","type":"Mechanical","name":"Hard Hitter","tier":"Elite","id":"180","task":"Kill the Giant Mole with 4 or fewer instances of damage.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Hard Hitter',
        fullurl: 'https://oldschool.runescape.wiki/w/Hard_Hitter',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hard Mode? Completed It': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Hard Mode","type":"Speed","name":"Hard Mode? Completed It","tier":"Master","id":"381","task":"Complete the Theatre of Blood: Hard Mode within the challenge time.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Hard Mode? Completed It',
        fullurl: 'https://oldschool.runescape.wiki/w/Hard_Mode%3F_Completed_It',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hardcore Raiders': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Perfection","name":"Hardcore Raiders","tier":"Elite","id":"430","task":"Complete the Tombs of Amascut in a group of two or more without anyone dying.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Hardcore Raiders',
        fullurl: 'https://oldschool.runescape.wiki/w/Hardcore_Raiders',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hardcore Tombs': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Perfection","name":"Hardcore Tombs","tier":"Elite","id":"431","task":"Complete the Tombs of Amascut solo without dying.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Hardcore Tombs',
        fullurl: 'https://oldschool.runescape.wiki/w/Hardcore_Tombs',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Harder Mode I': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Hard Mode","type":"Perfection","name":"Harder Mode I","tier":"Grandmaster","id":"375","task":"Defeat Sotetseg in the Theatre of Blood: Hard Mode without anyone sharing the ball with anyone, without anyone dying, and without anyone taking damage from any of its other attacks or stepping on the wrong tile in the maze.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Harder Mode I',
        fullurl: 'https://oldschool.runescape.wiki/w/Harder_Mode_I',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Harder Mode II': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Hard Mode","type":"Perfection","name":"Harder Mode II","tier":"Grandmaster","id":"376","task":"Defeat Xarpus in the Theatre of Blood: Hard Mode after letting the exhumeds heal him to full health and without anyone in the team taking any damage.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Harder Mode II',
        fullurl: 'https://oldschool.runescape.wiki/w/Harder_Mode_II',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Harder Mode III': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Hard Mode","type":"Restriction","name":"Harder Mode III","tier":"Grandmaster","id":"379","task":"Defeat Verzik Vitur in the Theatre of Blood: Hard Mode without anyone attacking her with a melee weapon during her third phase.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Harder Mode III',
        fullurl: 'https://oldschool.runescape.wiki/w/Harder_Mode_III',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hazard Prevention': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Thermonuclear Smoke Devil","type":"Perfection","name":"Hazard Prevention","tier":"Elite","id":"262","task":"Kill the Thermonuclear Smoke Devil without it hitting anyone.","leagueRegion":"Kandarin"}',
          ],
        },
        fulltext: 'Hazard Prevention',
        fullurl: 'https://oldschool.runescape.wiki/w/Hazard_Prevention',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Heal No More': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Grotesque Guardians","type":"Mechanical","name":"Heal No More","tier":"Hard","id":"87","task":"Kill the Grotesque Guardians without letting Dawn receive any healing from her orbs.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Heal No More',
        fullurl: 'https://oldschool.runescape.wiki/w/Heal_No_More',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Helpful spirit who?': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Restriction","name":"Helpful spirit who?","tier":"Elite","id":"425","task":"Complete the Tombs of Amascut without using any supplies from the Helpful Spirit and without anyone dying. Honey locusts are included in this restriction.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Helpful spirit who?',
        fullurl: 'https://oldschool.runescape.wiki/w/Helpful_spirit_who%3F',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hespori Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Hespori","type":"Kill Count","name":"Hespori Adept","tier":"Hard","id":"123","task":"Kill Hespori 5 times.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Hespori Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Hespori_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hespori Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Hespori","type":"Speed","name":"Hespori Speed-Chaser","tier":"Master","id":"128","task":"Kill the Hespori in less than 36 seconds.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Hespori Speed-Chaser',
        fullurl: 'https://oldschool.runescape.wiki/w/Hespori_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hespori Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Hespori","type":"Speed","name":"Hespori Speed-Trialist","tier":"Elite","id":"127","task":"Kill the Hespori in less than 48 seconds.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Hespori Speed-Trialist',
        fullurl: 'https://oldschool.runescape.wiki/w/Hespori_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Hesporisn't": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Hespori","type":"Mechanical","name":"Hesporisn\'t","tier":"Hard","id":"124","task":"Finish off Hespori with a special attack.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: "Hesporisn't",
        fullurl: 'https://oldschool.runescape.wiki/w/Hesporisn%27t',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hide Penetration': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"King Black Dragon","type":"Restriction","name":"Hide Penetration","tier":"Medium","id":"165","task":"Kill the King Black Dragon with a stab weapon.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Hide Penetration',
        fullurl: 'https://oldschool.runescape.wiki/w/Hide_Penetration',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'High Hitter': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Moons of Peril","type":"Mechanical","name":"High Hitter","tier":"Elite","id":"527","task":"Defeat a Moon before they start their second special attack.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'High Hitter',
        fullurl: 'https://oldschool.runescape.wiki/w/High_Hitter',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hitting Them Where It Hurts': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Demonic Gorilla","type":"Restriction","name":"Hitting Them Where It Hurts","tier":"Elite","id":"75","task":"Finish off a Demonic Gorilla with a demonbane weapon.","leagueRegion":"Kandarin"}',
          ],
        },
        fulltext: 'Hitting Them Where It Hurts',
        fullurl:
          'https://oldschool.runescape.wiki/w/Hitting_Them_Where_It_Hurts',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Hoarder: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chaos Elemental","type":"Mechanical","name":"Hoarder","tier":"Hard","id":"59","task":"Kill the Chaos Elemental without it unequipping any of your items.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Hoarder',
        fullurl: 'https://oldschool.runescape.wiki/w/Hoarder',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hot on Your Feet': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corporeal Beast","type":"Perfection","name":"Hot on Your Feet","tier":"Elite","id":"67","task":"Kill the Corporeal Beast without anyone killing the dark core or taking damage from the dark core.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Hot on Your Feet',
        fullurl: 'https://oldschool.runescape.wiki/w/Hot_on_Your_Feet',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hueycoatl Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Hueycoatl","type":"Kill Count","name":"Hueycoatl Adept","tier":"Hard","id":"569","task":"Kill the Hueycoatl 10 times.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Hueycoatl Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Hueycoatl_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hueycoatl Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Hueycoatl","type":"Kill Count","name":"Hueycoatl Champion","tier":"Medium","id":"568","task":"Kill the Hueycoatl once.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Hueycoatl Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Hueycoatl_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hueycoatl Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Hueycoatl","type":"Speed","name":"Hueycoatl Speed-Chaser","tier":"Master","id":"577","task":"Kill the Hueycoatl in 2:30 with five or fewer players.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Hueycoatl Speed-Chaser',
        fullurl: 'https://oldschool.runescape.wiki/w/Hueycoatl_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hueycoatl Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Hueycoatl","type":"Speed","name":"Hueycoatl Speed-Runner","tier":"Grandmaster","id":"578","task":"Kill the Hueycoatl in 2:30 with three or fewer players.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Hueycoatl Speed-Runner',
        fullurl: 'https://oldschool.runescape.wiki/w/Hueycoatl_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hueycoatl Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Hueycoatl","type":"Speed","name":"Hueycoatl Speed-Trialist","tier":"Elite","id":"576","task":"Kill the Hueycoatl in 2:30","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Hueycoatl Speed-Trialist',
        fullurl: 'https://oldschool.runescape.wiki/w/Hueycoatl_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Hueycoatl Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Hueycoatl","type":"Kill Count","name":"Hueycoatl Veteran","tier":"Elite","id":"570","task":"Kill the Hueycoatl 25 times.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Hueycoatl Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Hueycoatl_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'I Brought Mine Too': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Fortis Colosseum","type":"Restriction","name":"I Brought Mine Too","tier":"Master","id":"540","task":"Defeat Sol Heredit using only a Spear, Hasta or Halberd.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'I Brought Mine Too',
        fullurl: 'https://oldschool.runescape.wiki/w/I_Brought_Mine_Too',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "I Can't Reach That": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Scorpia","type":"Perfection","name":"I Can\'t Reach That","tier":"Hard","id":"220","task":"Kill Scorpia without taking any damage from her.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: "I Can't Reach That",
        fullurl: 'https://oldschool.runescape.wiki/w/I_Can%27t_Reach_That',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'I Would Simply React': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phosani\'s Nightmare","type":"Mechanical","name":"I Would Simply React","tier":"Master","id":"407","task":"Kill Phosani\'s Nightmare without allowing your prayer to be disabled.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'I Would Simply React',
        fullurl: 'https://oldschool.runescape.wiki/w/I_Would_Simply_React',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'I should see a doctor': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Nex","type":"Restriction","name":"I should see a doctor","tier":"Grandmaster","id":"418","task":"Kill Nex whilst a player is coughing.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'I should see a doctor',
        fullurl: 'https://oldschool.runescape.wiki/w/I_should_see_a_doctor',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'I was here first!': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Fortis Colosseum","type":"Mechanical","name":"I was here first!","tier":"Elite","id":"548","task":"Kill a Jaguar Warrior using a Claw-type weapon special attack.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'I was here first!',
        fullurl: 'https://oldschool.runescape.wiki/w/I_was_here_first!',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "I'd Rather Be Illiterate": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Deranged Archaeologist","type":"Perfection","name":"I\'d Rather Be Illiterate","tier":"Medium","id":"79","task":"Kill the Deranged Archaeologist without anyone being hit by his \\"Learn to Read\\" attack.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: "I'd Rather Be Illiterate",
        fullurl:
          'https://oldschool.runescape.wiki/w/I%27d_Rather_Be_Illiterate',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "I'd Rather Not Learn": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Crazy Archaeologist","type":"Perfection","name":"I\'d Rather Not Learn","tier":"Medium","id":"73","task":"Kill the Crazy Archaeologist without anyone being hit by his \\"Rain of Knowledge\\" attack.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: "I'd Rather Not Learn",
        fullurl: 'https://oldschool.runescape.wiki/w/I%27d_Rather_Not_Learn',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "I'm in a rush": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Mechanical","name":"I\'m in a rush","tier":"Elite","id":"452","task":"Defeat Ba-Ba after destroying four or fewer rolling boulders in total without dying yourself.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: "I'm in a rush",
        fullurl: 'https://oldschool.runescape.wiki/w/I%27m_in_a_rush',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "I'm your son": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Hueycoatl","type":"Restriction","name":"I\'m your son","tier":"Hard","id":"575","task":"Kill the Hueycoatl whilst wearing two pieces of Hueycoatl armour.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: "I'm your son",
        fullurl: 'https://oldschool.runescape.wiki/w/I%27m_your_son',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'If Gorillas Could Fly': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Demonic Gorilla","type":"Kill Count","name":"If Gorillas Could Fly","tier":"Elite","id":"74","task":"Kill a Demonic Gorilla.","leagueRegion":"Kandarin"}',
          ],
        },
        fulltext: 'If Gorillas Could Fly',
        fullurl: 'https://oldschool.runescape.wiki/w/If_Gorillas_Could_Fly',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Immortal Raid Team': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric: Challenge Mode","type":"Perfection","name":"Immortal Raid Team","tier":"Master","id":"290","task":"Complete a Chambers of Xeric: Challenge mode raid without anyone dying.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Immortal Raid Team',
        fullurl: 'https://oldschool.runescape.wiki/w/Immortal_Raid_Team',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Immortal Raider': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric: Challenge Mode","type":"Perfection","name":"Immortal Raider","tier":"Master","id":"291","task":"Complete a Chambers of Xeric Challenge mode (Solo) raid without dying.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Immortal Raider',
        fullurl: 'https://oldschool.runescape.wiki/w/Immortal_Raider',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Inferno Grandmaster': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzKal-Zuk","type":"Kill Count","name":"Inferno Grandmaster","tier":"Grandmaster","id":"342","task":"Complete the Inferno 5 times.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Inferno Grandmaster',
        fullurl: 'https://oldschool.runescape.wiki/w/Inferno_Grandmaster',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Inferno Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzKal-Zuk","type":"Speed","name":"Inferno Speed-Runner","tier":"Grandmaster","id":"352","task":"Complete the Inferno in less than 65 minutes.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Inferno Speed-Runner',
        fullurl: 'https://oldschool.runescape.wiki/w/Inferno_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Insanity: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Perfection","name":"Insanity","tier":"Grandmaster","id":"445","task":"Complete \'Perfect Wardens\' at expert or above.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Insanity',
        fullurl: 'https://oldschool.runescape.wiki/w/Insanity',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Insect Deflection': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kalphite Queen","type":"Mechanical","name":"Insect Deflection","tier":"Elite","id":"160","task":"Kill the Kalphite Queen by using the Vengeance spell as the finishing blow.","leagueRegion":"Desert&Fremennik"}',
          ],
        },
        fulltext: 'Insect Deflection',
        fullurl: 'https://oldschool.runescape.wiki/w/Insect_Deflection',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Inspect Repellent': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Sarachnis","type":"Perfection","name":"Inspect Repellent","tier":"Hard","id":"209","task":"Kill Sarachnis without her dealing damage to anyone.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Inspect Repellent',
        fullurl: 'https://oldschool.runescape.wiki/w/Inspect_Repellent',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Into the Den of Giants': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"None","type":"Kill Count","name":"Into the Den of Giants","tier":"Easy","id":"398","task":"Kill a Hill Giant, Moss Giant and Fire Giant in the Giant Cave within the Shayzien region.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Into the Den of Giants',
        fullurl: 'https://oldschool.runescape.wiki/w/Into_the_Den_of_Giants',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Is it a bird?': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Hueycoatl","type":"Restriction","name":"Is it a bird?","tier":"Master","id":"573","task":"Kill the Hueycoatl using only dragonbane weaponry.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Is it a bird?',
        fullurl: 'https://oldschool.runescape.wiki/w/Is_it_a_bird%3F',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "It Wasn't a Fluke": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzHaar-Ket-Rak\'s Challenges","type":"Perfection","name":"It Wasn\'t a Fluke","tier":"Grandmaster","id":"370","task":"Complete TzHaar-Ket-Rak\'s fifth and sixth challenges back to back without failing.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: "It Wasn't a Fluke",
        fullurl: 'https://oldschool.runescape.wiki/w/It_Wasn%27t_a_Fluke',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Jad? What Are You Doing Here?': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzKal-Zuk","type":"Restriction","name":"Jad? What Are You Doing Here?","tier":"Grandmaster","id":"351","task":"Kill Tzkal-Zuk without killing the JalTok-Jad which spawns during wave 69.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Jad? What Are You Doing Here?',
        fullurl:
          'https://oldschool.runescape.wiki/w/Jad%3F_What_Are_You_Doing_Here%3F',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Just Like That': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Barrows","type":"Restriction","name":"Just Like That","tier":"Hard","id":"29","task":"Kill Karil using only damage dealt by special attacks.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Just Like That',
        fullurl: 'https://oldschool.runescape.wiki/w/Just_Like_That',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Just To Be Safe': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Entry Mode","type":"Mechanical","name":"Just To Be Safe","tier":"Elite","id":"391","task":"Defeat Sotetseg in the Theatre of Blood: Entry Mode after having split the big ball with your entire team. This must be done with a group size of at least 2.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Just To Be Safe',
        fullurl: 'https://oldschool.runescape.wiki/w/Just_To_Be_Safe',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "K'ril Tsutsaroth Adept": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"K\'ril Tsutsaroth","type":"Kill Count","name":"K\'ril Tsutsaroth Adept","tier":"Hard","id":"332","task":"Kill K\'ril Tsutsaroth 50 times.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: "K'ril Tsutsaroth Adept",
        fullurl: 'https://oldschool.runescape.wiki/w/K%27ril_Tsutsaroth_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "K'ril Tsutsaroth Veteran": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"K\'ril Tsutsaroth","type":"Kill Count","name":"K\'ril Tsutsaroth Veteran","tier":"Elite","id":"333","task":"Kill K\'ril Tsutsaroth 100 times.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: "K'ril Tsutsaroth Veteran",
        fullurl:
          'https://oldschool.runescape.wiki/w/K%27ril_Tsutsaroth_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Kalphite Queen Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kalphite Queen","type":"Kill Count","name":"Kalphite Queen Adept","tier":"Hard","id":"157","task":"Kill the Kalphite Queen 25 times.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Kalphite Queen Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Kalphite_Queen_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Kalphite Queen Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kalphite Queen","type":"Kill Count","name":"Kalphite Queen Veteran","tier":"Elite","id":"158","task":"Kill the Kalphite Queen 50 times.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Kalphite Queen Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Kalphite_Queen_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Keep Away': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"General Graardor","type":"Perfection","name":"Keep Away","tier":"Grandmaster","id":"22","task":"Kill General Graardor in a private instance without taking any damage from the boss or bodyguards.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Keep Away',
        fullurl: 'https://oldschool.runescape.wiki/w/Keep_Away',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Kemo Makti': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Amoxliatl","type":"Stamina","name":"Kemo Makti","tier":"Hard","id":"586","task":"Kill Amoxliatl 10 times without leaving her chamber.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Kemo Makti',
        fullurl: 'https://oldschool.runescape.wiki/w/Kemo_Makti',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Kill It with Fire': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Restriction","name":"Kill It with Fire","tier":"Elite","id":"321","task":"Finish off the Ice Demon with a fire spell.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Kill It with Fire',
        fullurl: 'https://oldschool.runescape.wiki/w/Kill_It_with_Fire',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'King Black Dragon Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"King Black Dragon","type":"Kill Count","name":"King Black Dragon Champion","tier":"Medium","id":"163","task":"Kill the King Black Dragon 25 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'King Black Dragon Champion',
        fullurl:
          'https://oldschool.runescape.wiki/w/King_Black_Dragon_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'King Black Dragon Novice': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"King Black Dragon","type":"Kill Count","name":"King Black Dragon Novice","tier":"Easy","id":"162","task":"Kill the King Black Dragon 10 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'King Black Dragon Novice',
        fullurl: 'https://oldschool.runescape.wiki/w/King_Black_Dragon_Novice',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Krakan't Hurt Me": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kraken","type":"Stamina","name":"Krakan\'t Hurt Me","tier":"Hard","id":"170","task":"Kill the Kraken 25 times in a private instance without leaving the room.","leagueRegion":"Kandarin"}',
          ],
        },
        fulltext: "Krakan't Hurt Me",
        fullurl: 'https://oldschool.runescape.wiki/w/Krakan%27t_Hurt_Me',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Kraken Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kraken","type":"Kill Count","name":"Kraken Adept","tier":"Hard","id":"168","task":"Kill the Kraken 20 times.","leagueRegion":"Kandarin"}',
          ],
        },
        fulltext: 'Kraken Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Kraken_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Kree'arra Adept": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kree\'arra","type":"Kill Count","name":"Kree\'arra Adept","tier":"Hard","id":"9","task":"Kill Kree\'arra 50 times.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: "Kree'arra Adept",
        fullurl: 'https://oldschool.runescape.wiki/w/Kree%27arra_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Kree'arra Veteran": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kree\'arra","type":"Kill Count","name":"Kree\'arra Veteran","tier":"Elite","id":"10","task":"Kill Kree\'arra 100 times.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: "Kree'arra Veteran",
        fullurl: 'https://oldschool.runescape.wiki/w/Kree%27arra_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Leaving No One Behind': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Wintertodt","type":"Restriction","name":"Leaving No One Behind","tier":"Medium","id":"284","task":"Subdue the Wintertodt without any of the Pyromancers falling.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Leaving No One Behind',
        fullurl: 'https://oldschool.runescape.wiki/w/Leaving_No_One_Behind',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Let it seep in': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Araxxor","type":"Restriction","name":"Let it seep in","tier":"Master","id":"563","task":"Kill Araxxor without ever having venom or poison immunity.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Let it seep in',
        fullurl: 'https://oldschool.runescape.wiki/w/Let_it_seep_in',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Leviathan Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Leviathan","type":"Kill Count","name":"Leviathan Adept","tier":"Elite","id":"506","task":"Kill the Leviathan once."}',
          ],
        },
        fulltext: 'Leviathan Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Leviathan_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Leviathan Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Leviathan","type":"Kill Count","name":"Leviathan Master","tier":"Master","id":"507","task":"Kill the Leviathan 50 times."}',
          ],
        },
        fulltext: 'Leviathan Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Leviathan_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Leviathan Sleeper': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Leviathan","type":"Kill Count","name":"Leviathan Sleeper","tier":"Grandmaster","id":"508","task":"Kill the Awakened Leviathan."}',
          ],
        },
        fulltext: 'Leviathan Sleeper',
        fullurl: 'https://oldschool.runescape.wiki/w/Leviathan_Sleeper',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Leviathan Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Leviathan","type":"Speed","name":"Leviathan Speed-Chaser","tier":"Master","id":"504","task":"Kill the Leviathan in less than 1:25 without a slayer task."}',
          ],
        },
        fulltext: 'Leviathan Speed-Chaser',
        fullurl: 'https://oldschool.runescape.wiki/w/Leviathan_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Leviathan Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Leviathan","type":"Speed","name":"Leviathan Speed-Runner","tier":"Grandmaster","id":"505","task":"Kill the Leviathan in less than 1:10 without a slayer task."}',
          ],
        },
        fulltext: 'Leviathan Speed-Runner',
        fullurl: 'https://oldschool.runescape.wiki/w/Leviathan_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Leviathan Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Leviathan","type":"Speed","name":"Leviathan Speed-Trialist","tier":"Elite","id":"503","task":"Kill the Leviathan in less than 1:50 without a slayer task."}',
          ],
        },
        fulltext: 'Leviathan Speed-Trialist',
        fullurl: 'https://oldschool.runescape.wiki/w/Leviathan_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Lightning Lure': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Alchemical Hydra","type":"Mechanical","name":"Lightning Lure","tier":"Master","id":"138","task":"Kill the Alchemical Hydra without being hit by the lightning attack.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Lightning Lure',
        fullurl: 'https://oldschool.runescape.wiki/w/Lightning_Lure',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Lunar Triplet': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Moons of Peril","type":"Kill Count","name":"Lunar Triplet","tier":"Medium","id":"528","task":"Open the Reward Chest after defeating all three Moons.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Lunar Triplet',
        fullurl: 'https://oldschool.runescape.wiki/w/Lunar_Triplet',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Mage of the Ruins': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Crazy Archaeologist","type":"Mechanical","name":"Mage of the Ruins","tier":"Medium","id":"72","task":"Kill the Crazy Archaeologist with only magical attacks.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Mage of the Ruins',
        fullurl: 'https://oldschool.runescape.wiki/w/Mage_of_the_Ruins',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Mage of the Swamp': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Deranged Archaeologist","type":"Mechanical","name":"Mage of the Swamp","tier":"Medium","id":"78","task":"Kill the Deranged Archaeologist with only magical attacks.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Mage of the Swamp',
        fullurl: 'https://oldschool.runescape.wiki/w/Mage_of_the_Swamp',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Combat Achievements/Master': {
        printouts: {
          'Combat Achievement JSON': [],
        },
        fulltext: 'Combat Achievements/Master',
        fullurl:
          'https://oldschool.runescape.wiki/w/Combat_Achievements/Master',
        namespace: 0,
        exists: '1',
        displaytitle: 'Master Combat Achievements',
      },
      'Master of Broad Weaponry': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kurask","type":"Kill Count","name":"Master of Broad Weaponry","tier":"Medium","id":"173","task":"Kill a Kurask.","leagueRegion":"Fremennik,Tirannwn"}',
          ],
        },
        fulltext: 'Master of Broad Weaponry',
        fullurl: 'https://oldschool.runescape.wiki/w/Master_of_Broad_Weaponry',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Master of Buckets': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tempoross","type":"Mechanical","name":"Master of Buckets","tier":"Easy","id":"356","task":"Extinguish at least 5 fires during a single Tempoross fight.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Master of Buckets',
        fullurl: 'https://oldschool.runescape.wiki/w/Master_of_Buckets',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Maybe I'm the boss.": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Mechanical","name":"Maybe I\'m the boss.","tier":"Grandmaster","id":"448","task":"Complete a Tombs of Amascut raid with every single boss invocation activated and without anyone dying.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: "Maybe I'm the boss.",
        fullurl: 'https://oldschool.runescape.wiki/w/Maybe_I%27m_the_boss.',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Combat Achievements/Medium': {
        printouts: {
          'Combat Achievement JSON': [],
        },
        fulltext: 'Combat Achievements/Medium',
        fullurl:
          'https://oldschool.runescape.wiki/w/Combat_Achievements/Medium',
        namespace: 0,
        exists: '1',
        displaytitle: 'Medium Combat Achievements',
      },
      'Mimic Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Mimic","type":"Kill Count","name":"Mimic Veteran","tier":"Elite","id":"176","task":"Kill the Mimic once.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Mimic Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Mimic_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Mirror Image': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Duke Sucellus","type":"Restriction","name":"Mirror Image","tier":"Grandmaster","id":"520","task":"Kill Duke Sucellus whilst only attacking the boss on the same tick Duke attacks you."}',
          ],
        },
        fulltext: 'Mirror Image',
        fullurl: 'https://oldschool.runescape.wiki/w/Mirror_Image',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Mixing Correctly': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Alchemical Hydra","type":"Mechanical","name":"Mixing Correctly","tier":"Master","id":"140","task":"Kill the Alchemical Hydra without empowering it.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Mixing Correctly',
        fullurl: 'https://oldschool.runescape.wiki/w/Mixing_Correctly',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Moons of Peril Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Moons of Peril","type":"Speed","name":"Moons of Peril Speed-Chaser","tier":"Hard","id":"536","task":"Defeat all three Moons in one run in under 6 minutes.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Moons of Peril Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Moons_of_Peril_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Moons of Peril Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Moons of Peril","type":"Speed","name":"Moons of Peril Speed-Trialist","tier":"Medium","id":"535","task":"Defeat all three Moons in one run in under 8 minutes.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Moons of Peril Speed-Trialist',
        fullurl:
          'https://oldschool.runescape.wiki/w/Moons_of_Peril_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'More than just a ranged weapon': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phantom Muspah","type":"Restriction","name":"More than just a ranged weapon","tier":"Master","id":"472","task":"Kill the Phantom Muspah by only dealing damage to it with a salamander.","leagueRegion":"Fremennik&Morytania,Fremennik&Desert,Fremennik&Kandarin,Fremennik&Wilderness"}',
          ],
        },
        fulltext: 'More than just a ranged weapon',
        fullurl:
          'https://oldschool.runescape.wiki/w/More_than_just_a_ranged_weapon',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Morytania Only': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Restriction","name":"Morytania Only","tier":"Grandmaster","id":"252","task":"Complete the Theatre of Blood without any member of the team equipping a non-barrows weapon (except Dawnbringer).","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Morytania Only',
        fullurl: 'https://oldschool.runescape.wiki/w/Morytania_Only',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Movin' on up": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Entry Mode","type":"Restriction","name":"Movin\' on up","tier":"Hard","id":"464","task":"Complete a Tombs of Amascut raid at level 50 or above.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: "Movin' on up",
        fullurl: 'https://oldschool.runescape.wiki/w/Movin%27_on_up',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Moving Collateral': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Commander Zilyana","type":"Restriction","name":"Moving Collateral","tier":"Master","id":"215","task":"Kill Commander Zilyana in a private instance without attacking her directly.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Moving Collateral',
        fullurl: 'https://oldschool.runescape.wiki/w/Moving_Collateral',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Multi-Style Specialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzHaar-Ket-Rak\'s Challenges","type":"Mechanical","name":"Multi-Style Specialist","tier":"Master","id":"371","task":"Complete TzHaar-Ket-Rak\'s third challenge while using a different attack style for each JalTok-Jad.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Multi-Style Specialist',
        fullurl: 'https://oldschool.runescape.wiki/w/Multi-Style_Specialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Mummy!': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Wintertodt","type":"Mechanical","name":"Mummy!","tier":"Easy","id":"281","task":"Heal a pyromancer after they have fallen.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Mummy!',
        fullurl: 'https://oldschool.runescape.wiki/w/Mummy!',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Mutta-diet': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Mechanical","name":"Mutta-diet","tier":"Elite","id":"307","task":"Kill the Muttadile without letting her or her baby recover hitpoints from the meat tree.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Mutta-diet',
        fullurl: 'https://oldschool.runescape.wiki/w/Mutta-diet',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nagua Negation': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Amoxliatl","type":"Perfection","name":"Nagua Negation","tier":"Hard","id":"583","task":"Kill Amoxliatl without taking any damage.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Nagua Negation',
        fullurl: 'https://oldschool.runescape.wiki/w/Nagua_Negation',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Newspaper Enthusiast': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Sarachnis","type":"Restriction","name":"Newspaper Enthusiast","tier":"Medium","id":"210","task":"Kill Sarachnis with a crush weapon.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Newspaper Enthusiast',
        fullurl: 'https://oldschool.runescape.wiki/w/Newspaper_Enthusiast',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nex Duo': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Nex","type":"Restriction","name":"Nex Duo","tier":"Grandmaster","id":"417","task":"Kill Nex with two or less players at the start of the fight.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Nex Duo',
        fullurl: 'https://oldschool.runescape.wiki/w/Nex_Duo',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nex Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Nex","type":"Kill Count","name":"Nex Master","tier":"Master","id":"411","task":"Kill Nex 25 times.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Nex Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Nex_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nex Survivors': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Nex","type":"Restriction","name":"Nex Survivors","tier":"Elite","id":"412","task":"Kill Nex without anyone dying.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Nex Survivors',
        fullurl: 'https://oldschool.runescape.wiki/w/Nex_Survivors',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nex Trio': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Nex","type":"Restriction","name":"Nex Trio","tier":"Master","id":"416","task":"Kill Nex with three or less players at the start of the fight.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Nex Trio',
        fullurl: 'https://oldschool.runescape.wiki/w/Nex_Trio',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nex Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Nex","type":"Kill Count","name":"Nex Veteran","tier":"Elite","id":"410","task":"Kill Nex once.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Nex Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Nex_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nibbler Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzKal-Zuk","type":"Restriction","name":"Nibbler Chaser","tier":"Grandmaster","id":"349","task":"Kill Tzkal-Zuk without using any magic spells during any wave in the Inferno.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Nibbler Chaser',
        fullurl: 'https://oldschool.runescape.wiki/w/Nibbler_Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nibblers, Begone!': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzKal-Zuk","type":"Perfection","name":"Nibblers, Begone!","tier":"Master","id":"346","task":"Kill Tzkal-Zuk without letting a pillar fall before wave 67.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Nibblers, Begone!',
        fullurl: 'https://oldschool.runescape.wiki/w/Nibblers,_Begone!',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nightmare (5-Scale) Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Nightmare","type":"Speed","name":"Nightmare (5-Scale) Speed-Chaser","tier":"Master","id":"195","task":"Defeat the Nightmare (5-scale) in less than 4 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Nightmare (5-Scale) Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Nightmare_(5-Scale)_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nightmare (5-Scale) Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Nightmare","type":"Speed","name":"Nightmare (5-Scale) Speed-Runner","tier":"Grandmaster","id":"196","task":"Defeat the Nightmare (5-scale) in less than 3:30 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Nightmare (5-Scale) Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Nightmare_(5-Scale)_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nightmare (5-Scale) Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Nightmare","type":"Speed","name":"Nightmare (5-Scale) Speed-Trialist","tier":"Elite","id":"194","task":"Defeat the Nightmare (5-scale) in less than 5 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Nightmare (5-Scale) Speed-Trialist',
        fullurl:
          'https://oldschool.runescape.wiki/w/Nightmare_(5-Scale)_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nightmare (Solo) Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Nightmare","type":"Speed","name":"Nightmare (Solo) Speed-Chaser","tier":"Master","id":"192","task":"Defeat the Nightmare (Solo) in less than 19 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Nightmare (Solo) Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Nightmare_(Solo)_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nightmare (Solo) Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Nightmare","type":"Speed","name":"Nightmare (Solo) Speed-Runner","tier":"Grandmaster","id":"193","task":"Defeat the Nightmare (Solo) in less than 16 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Nightmare (Solo) Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Nightmare_(Solo)_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nightmare (Solo) Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Nightmare","type":"Speed","name":"Nightmare (Solo) Speed-Trialist","tier":"Elite","id":"191","task":"Defeat the Nightmare (Solo) in less than 23 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Nightmare (Solo) Speed-Trialist',
        fullurl:
          'https://oldschool.runescape.wiki/w/Nightmare_(Solo)_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nightmare Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Nightmare","type":"Kill Count","name":"Nightmare Adept","tier":"Hard","id":"183","task":"Kill The Nightmare once.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Nightmare Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Nightmare_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nightmare Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Nightmare","type":"Kill Count","name":"Nightmare Master","tier":"Master","id":"185","task":"Kill The Nightmare 50 times.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Nightmare Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Nightmare_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nightmare Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Nightmare","type":"Kill Count","name":"Nightmare Veteran","tier":"Elite","id":"184","task":"Kill The Nightmare 25 times.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Nightmare Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Nightmare_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'No Luck Required': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzKal-Zuk","type":"Perfection","name":"No Luck Required","tier":"Grandmaster","id":"345","task":"Kill Tzkal-Zuk without being attacked by TzKal-Zuk and without taking damage from a JalTok-Jad.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'No Luck Required',
        fullurl: 'https://oldschool.runescape.wiki/w/No_Luck_Required',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'No Pressure': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Alchemical Hydra","type":"Restriction","name":"No Pressure","tier":"Grandmaster","id":"143","task":"Kill the Alchemical Hydra using only Dharok\'s Greataxe as a weapon whilst having no more than 10 Hitpoints throughout the entire fight.","leagueRegion":"Kourend&Morytania"}',
          ],
        },
        fulltext: 'No Pressure',
        fullurl: 'https://oldschool.runescape.wiki/w/No_Pressure',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'No Time for Death': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Mechanical","name":"No Time for Death","tier":"Master","id":"304","task":"Clear the Tightrope room without Killing any Deathly Mages or Deathly Rangers.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'No Time for Death',
        fullurl: 'https://oldschool.runescape.wiki/w/No_Time_for_Death',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'No Time for a Drink': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzTok-Jad","type":"Restriction","name":"No Time for a Drink","tier":"Grandmaster","id":"154","task":"Complete the Fight Caves without losing any prayer points.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'No Time for a Drink',
        fullurl: 'https://oldschool.runescape.wiki/w/No_Time_for_a_Drink',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'No skipping allowed': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Mechanical","name":"No skipping allowed","tier":"Elite","id":"451","task":"Defeat Ba-Ba after only attacking the non-weakened boulders in the rolling boulder phase, without dying yourself. The Boulderdash invocation must be activated.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'No skipping allowed',
        fullurl: 'https://oldschool.runescape.wiki/w/No_skipping_allowed',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'No-Pillar': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Entry Mode","type":"Mechanical","name":"No-Pillar","tier":"Elite","id":"393","task":"Survive Verzik Vitur\'s pillar phase in the Theatre of Blood: Entry Mode without losing a single pillar.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'No-Pillar',
        fullurl: 'https://oldschool.runescape.wiki/w/No-Pillar',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Not So Great After All': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Greater Demon","type":"Restriction","name":"Not So Great After All","tier":"Easy","id":"121","task":"Finish off a Greater Demon with a demonbane weapon.","leagueRegion":"Asgarnia,Kandarin,Karamja,Kourend,Misthalin,Morytania,Wilderness"}',
          ],
        },
        fulltext: 'Not So Great After All',
        fullurl: 'https://oldschool.runescape.wiki/w/Not_So_Great_After_All',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Novice Tomb Explorer': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Entry Mode","type":"Kill Count","name":"Novice Tomb Explorer","tier":"Hard","id":"461","task":"Complete the Tombs of Amascut in Entry mode (or above) once.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Novice Tomb Explorer',
        fullurl: 'https://oldschool.runescape.wiki/w/Novice_Tomb_Explorer',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Novice Tomb Looter': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Entry Mode","type":"Kill Count","name":"Novice Tomb Looter","tier":"Hard","id":"462","task":"Complete the Tombs of Amascut in Entry mode (or above) 25 times.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Novice Tomb Looter',
        fullurl: 'https://oldschool.runescape.wiki/w/Novice_Tomb_Looter',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Novice Tomb Raider': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Entry Mode","type":"Kill Count","name":"Novice Tomb Raider","tier":"Elite","id":"463","task":"Complete the Tombs of Amascut in Entry mode (or above) 50 times.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Novice Tomb Raider',
        fullurl: 'https://oldschool.runescape.wiki/w/Novice_Tomb_Raider',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Noxious Foe': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Aberrant Spectre","type":"Kill Count","name":"Noxious Foe","tier":"Easy","id":"0","task":"Kill an Aberrant Spectre.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Noxious Foe',
        fullurl: 'https://oldschool.runescape.wiki/w/Noxious_Foe',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nylo Sniper': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Hard Mode","type":"Mechanical","name":"Nylo Sniper","tier":"Grandmaster","id":"377","task":"Defeat Verzik Vitur\'s in the Theatre of Blood: Hard Mode without anyone in your team causing a Nylocas to explode by getting too close.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Nylo Sniper',
        fullurl: 'https://oldschool.runescape.wiki/w/Nylo_Sniper',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Nylocas, On the Rocks': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Entry Mode","type":"Mechanical","name":"Nylocas, On the Rocks","tier":"Elite","id":"390","task":"In the Theatre of Blood: Entry Mode, freeze any 4 Nylocas with a single Ice Barrage spell.","leagueRegion":"Morytania&Desert"}',
          ],
        },
        fulltext: 'Nylocas, On the Rocks',
        fullurl: 'https://oldschool.runescape.wiki/w/Nylocas,_On_the_Rocks',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Obor Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Obor","type":"Kill Count","name":"Obor Champion","tier":"Medium","id":"130","task":"Kill Obor 5 times.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Obor Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Obor_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Obor Novice': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Obor","type":"Kill Count","name":"Obor Novice","tier":"Easy","id":"129","task":"Kill Obor once.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Obor Novice',
        fullurl: 'https://oldschool.runescape.wiki/w/Obor_Novice',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'One Hundred Tentacles': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kraken","type":"Stamina","name":"One Hundred Tentacles","tier":"Master","id":"172","task":"Kill the Kraken 100 times in a private instance without leaving the room.","leagueRegion":"Kandarin"}',
          ],
        },
        fulltext: 'One Hundred Tentacles',
        fullurl: 'https://oldschool.runescape.wiki/w/One_Hundred_Tentacles',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'One-off': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Fortis Colosseum","type":"Mechanical","name":"One-off","tier":"Master","id":"546","task":"Complete Wave 11 with either \'Red Flag\', \'Dynamic Duo\', or \'Doom II\' active.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'One-off',
        fullurl: 'https://oldschool.runescape.wiki/w/One-off',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Ourg Freezer': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"General Graardor","type":"Mechanical","name":"Ourg Freezer","tier":"Hard","id":"18","task":"Kill General Graardor whilst he is immobilized.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Ourg Freezer',
        fullurl: 'https://oldschool.runescape.wiki/w/Ourg_Freezer',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Ourg Freezer II': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"General Graardor","type":"Mechanical","name":"Ourg Freezer II","tier":"Elite","id":"19","task":"Kill General Graardor without him attacking any players.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Ourg Freezer II',
        fullurl: 'https://oldschool.runescape.wiki/w/Ourg_Freezer_II',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Ourg Killer': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"General Graardor","type":"Stamina","name":"Ourg Killer","tier":"Grandmaster","id":"23","task":"Kill General Graardor 15 times in a private instance without leaving the room.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Ourg Killer',
        fullurl: 'https://oldschool.runescape.wiki/w/Ourg_Killer',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Pack Like a Yak': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Hard Mode","type":"Restriction","name":"Pack Like a Yak","tier":"Grandmaster","id":"380","task":"Complete the Theatre of Blood: Hard Mode within the challenge time, with no deaths and without anyone buying anything from a supply chest.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Pack Like a Yak',
        fullurl: 'https://oldschool.runescape.wiki/w/Pack_Like_a_Yak',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Pass It On': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Entry Mode","type":"Mechanical","name":"Pass It On","tier":"Elite","id":"395","task":"In the Theatre of Blood: Entry Mode, successfully pass on the green ball to a team mate.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Pass It On',
        fullurl: 'https://oldschool.runescape.wiki/w/Pass_It_On',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Peach Conjurer': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Commander Zilyana","type":"Stamina","name":"Peach Conjurer","tier":"Grandmaster","id":"217","task":"Kill Commander Zilyana 50 times in a privately rented instance without leaving the room.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Peach Conjurer',
        fullurl: 'https://oldschool.runescape.wiki/w/Peach_Conjurer',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Akkha': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Perfection","name":"Perfect Akkha","tier":"Master","id":"433","task":"Complete Akkha in a group of two or more, without anyone taking any damage from the following: Akkha\'s attacks off-prayer, Akkha\'s special attacks (orbs, memory, detonate), exploding shadow timers, orbs in the enrage phase or attacking Akkha with the wrong style. You must have all Akkha invocations activated.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Perfect Akkha',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Akkha',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Apmeken': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Perfection","name":"Perfect Apmeken","tier":"Elite","id":"435","task":"Complete the Apmeken room in a group of two or more, without anyone allowing any dangers to trigger, standing in venom or being hit by a volatile baboon. You must complete this room in less than three minutes.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Perfect Apmeken',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Apmeken',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Araxxor': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Araxxor","type":"Perfection","name":"Perfect Araxxor","tier":"Master","id":"561","task":"Kill Araxxor perfectly, without taking damage from Araxxor\'s Mage & Range attacks, melee attack off prayer, araxyte minions damage, or damage from acid pools.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Perfect Araxxor',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Araxxor',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Araxxor 2': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Araxxor","type":"Perfection","name":"Perfect Araxxor 2","tier":"Grandmaster","id":"562","task":"Kill Araxxor perfectly, without hitting it during the enrage phase.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Perfect Araxxor 2',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Araxxor_2',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Ba-Ba': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Perfection","name":"Perfect Ba-Ba","tier":"Master","id":"436","task":"Defeat Ba-Ba in a group of two or more, without anyone taking any damage from the following: Ba-Ba\'s Attacks off-prayer, Ba-Ba\'s slam, rolling boulders, rubble attack or falling rocks. No sarcophagi may be opened. You must have all Ba-Ba invocations activated.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Perfect Ba-Ba',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Ba-Ba',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Bloat': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Perfection","name":"Perfect Bloat","tier":"Master","id":"245","task":"Kill the Pestilent Bloat without anyone in the team taking damage from the following sources: Pestilent flies, Falling body parts or The Pestilent Bloats stomp attack.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Perfect Bloat',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Bloat',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Corrupted Hunllef': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corrupted Hunllef","type":"Perfection","name":"Perfect Corrupted Hunllef","tier":"Master","id":"102","task":"Kill the Corrupted Hunllef without taking damage from: Tornadoes, Damaging Floor or Stomp Attacks. Also, do not take damage off prayer and do not attack the Corrupted Hunllef with the wrong weapon.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Perfect Corrupted Hunllef',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Corrupted_Hunllef',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Crondis': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Perfection","name":"Perfect Crondis","tier":"Elite","id":"438","task":"Complete the Crondis room without letting a crocodile get to the tree, without anyone losing water from their container and in under one minute.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Perfect Crondis',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Crondis',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Crystalline Hunllef': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Crystalline Hunllef","type":"Perfection","name":"Perfect Crystalline Hunllef","tier":"Master","id":"112","task":"Kill the Crystalline Hunllef without taking damage from: Tornadoes, Damaging Floor or Stomp Attacks. Also, do not take damage off prayer and do not attack the Crystalline Hunllef with the wrong weapon.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Perfect Crystalline Hunllef',
        fullurl:
          'https://oldschool.runescape.wiki/w/Perfect_Crystalline_Hunllef',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Duke Sucellus': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Duke Sucellus","type":"Perfection","name":"Perfect Duke Sucellus","tier":"Master","id":"518","task":"Kill Duke Sucellus without taking any avoidable damage 5 times without leaving."}',
          ],
        },
        fulltext: 'Perfect Duke Sucellus',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Duke_Sucellus',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Footwork': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Fortis Colosseum","type":"Perfection","name":"Perfect Footwork","tier":"Grandmaster","id":"543","task":"Defeat Sol Heredit without taking any damage from his Spear, Shield, Grapple or Triple Attack.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Perfect Footwork',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Footwork',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Grotesque Guardians': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Grotesque Guardians","type":"Perfection","name":"Perfect Grotesque Guardians","tier":"Elite","id":"90","task":"Kill the Grotesque Guardians whilst completing the \\"Don\'t look at the eclipse\\", \\"Prison Break\\", \\"Granite Footwork\\", \\"Heal no more\\", \\"Static Awareness\\" and \\"Done before dusk\\" tasks.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Perfect Grotesque Guardians',
        fullurl:
          'https://oldschool.runescape.wiki/w/Perfect_Grotesque_Guardians',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Grotesque Guardians II': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Grotesque Guardians","type":"Perfection","name":"Perfect Grotesque Guardians II","tier":"Master","id":"91","task":"Kill the Grotesque Guardians 5 times in a row without leaving the instance, whilst completing the Perfect Grotesque Guardians task every time.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Perfect Grotesque Guardians II',
        fullurl:
          'https://oldschool.runescape.wiki/w/Perfect_Grotesque_Guardians_II',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Het': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Perfection","name":"Perfect Het","tier":"Elite","id":"432","task":"Complete the Het room without taking any damage from the light beam and orbs. You must destroy the core after one exposure.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Perfect Het',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Het',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Hueycoatl': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Hueycoatl","type":"Perfection","name":"Perfect Hueycoatl","tier":"Elite","id":"571","task":"Kill the Hueycoatl perfectly 5 times without leaving. To get a perfect kill, you must not take any avoidable damage from the Hueycoatl\'s lightning attack, tail slam attack or off-prayer projectile attacks.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Perfect Hueycoatl',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Hueycoatl',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Kephri': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Perfection","name":"Perfect Kephri","tier":"Master","id":"442","task":"Defeat Kephri in a group of two or more, without anyone taking any damage from the following: egg explosions, Kephri\'s attacks, Exploding Scarabs, Bodyguards, dung attacks. No eggs may hatch throughout the fight.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Perfect Kephri',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Kephri',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Leviathan': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Leviathan","type":"Perfection","name":"Perfect Leviathan","tier":"Master","id":"509","task":"Kill the Leviathan perfectly 5 times without leaving."}',
          ],
        },
        fulltext: 'Perfect Leviathan',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Leviathan',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Maiden': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Perfection","name":"Perfect Maiden","tier":"Master","id":"244","task":"Kill The Maiden of Sugadinti without anyone in the team taking damage from the following sources: Blood Spawn projectiles and Blood Spawn trails. Also, without taking damage off prayer and without letting any of the Nylocas Matomenos heal The Maiden.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Perfect Maiden',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Maiden',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Nex': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Nex","type":"Perfection","name":"Perfect Nex","tier":"Grandmaster","id":"419","task":"Kill Nex whilst completing the requirements for \\"There is no escape\\", \\"Shadows move\\", \\"A siphon will solve this\\", and \\"Contain this!\\"","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Perfect Nex',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Nex',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Nightmare': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Nightmare","type":"Perfection","name":"Perfect Nightmare","tier":"Master","id":"188","task":"Kill the Nightmare without any player taking damage from the following attacks: Nightmare rifts, an un-cured parasite explosion, Corpse flowers or the Nightmare\'s Surge. Also, no player can take damage off prayer or have their attacks slowed by the Nightmare spores.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Perfect Nightmare',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Nightmare',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Nylocas': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Perfection","name":"Perfect Nylocas","tier":"Master","id":"246","task":"Kill the Nylocas Vasilias without anyone in the team attacking any Nylocas with the wrong attack style, without letting a pillar collapse and without getting hit by any of the Nylocas Vasilias attacks whilst off prayer.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Perfect Nylocas',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Nylocas',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Olm (Solo)': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Perfection","name":"Perfect Olm (Solo)","tier":"Master","id":"317","task":"Kill the Great Olm in a solo raid without taking damage from any of the following: Teleport portals, Fire Walls, Healing pools, Crystal Bombs, Crystal Burst or Prayer Orbs. You also cannot let his claws regenerate or take damage from the same acid pool back to back.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Perfect Olm (Solo)',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Olm_(Solo)',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Olm (Trio)': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Perfection","name":"Perfect Olm (Trio)","tier":"Master","id":"318","task":"Kill the Great Olm in a trio raid without any team member taking damage from any of the following: Teleport portals, Fire Walls, Healing pools, Crystal Bombs, Crystal Burst or Prayer Orbs. You also cannot let his claws regenerate or take damage from the same acid pool back to back.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Perfect Olm (Trio)',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Olm_(Trio)',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Perfect Phosani's Nightmare": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phosani\'s Nightmare","type":"Perfection","name":"Perfect Phosani\'s Nightmare","tier":"Grandmaster","id":"403","task":"Kill Phosani\'s Nightmare while only taking damage from husks, power blasts and weakened Parasites. Also, without having your attacks slowed by the Nightmare Spores or letting a Sleepwalker reach Phosani\'s Nightmare.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: "Perfect Phosani's Nightmare",
        fullurl:
          'https://oldschool.runescape.wiki/w/Perfect_Phosani%27s_Nightmare',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Scabaras': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Perfection","name":"Perfect Scabaras","tier":"Master","id":"441","task":"Complete the Scabaras room in less than a minute without anyone taking any damage from puzzles.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Perfect Scabaras',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Scabaras',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Scurrius': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Scurrius","type":"Perfection","name":"Perfect Scurrius","tier":"Medium","id":"524","task":"Kill Scurrius in a private instance without taking damage from the following attacks: Tail Swipe and Falling Bricks. Pray correctly against the following attacks: Flying Fur and Bolts of Electricity.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Perfect Scurrius',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Scurrius',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Sire': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Abyssal Sire","type":"Perfection","name":"Perfect Sire","tier":"Elite","id":"8","task":"Kill the Abyssal Sire without taking damage from the external tentacles, miasma pools, explosion or damage from the Abyssal Sire without praying the appropriate protection prayer.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Perfect Sire',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Sire',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Sotesteg': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Perfection","name":"Perfect Sotesteg","tier":"Master","id":"247","task":"Kill Sotetseg without anyone in the team stepping on the wrong tile in the maze, without getting hit by the tornado and without taking any damage from Sotetseg\'s attacks whilst off prayer.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Perfect Sotesteg',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Sotesteg',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Theatre': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Perfection","name":"Perfect Theatre","tier":"Grandmaster","id":"243","task":"Complete the Theatre of Blood without anyone dying through any means and whilst everyone in the team completes the following Combat Achievement tasks in a single run: \\"Perfect Maiden\\", \\"Perfect Bloat\\", \\"Perfect Nylocas\\", \\"Perfect Sotetseg\\", \\"Perfect Xarpus\\" and \\"Perfect Verzik\\".","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Perfect Theatre',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Theatre',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Vardorvis': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vardorvis","type":"Perfection","name":"Perfect Vardorvis","tier":"Master","id":"491","task":"Kill Vardorvis perfectly 5 times without leaving.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Perfect Vardorvis',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Vardorvis',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Verzik': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Perfection","name":"Perfect Verzik","tier":"Master","id":"249","task":"Defeat Verzik Vitur without anyone in the team taking damage from Verzik Vitur\'s attacks other than her spider form\'s correctly prayed against regular magical and ranged attacks.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Perfect Verzik',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Verzik',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Wardens': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Perfection","name":"Perfect Wardens","tier":"Master","id":"444","task":"Defeat The Wardens in a group of two or more, without anyone taking avoidable damage from the following: Warden attacks, obelisk attacks, lightning attacks in phase three, skull attack in phase three, Demi god attacks in phase three. You must have all Wardens invocations activated.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Perfect Wardens',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Wardens',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Whisperer': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Whisperer","type":"Perfection","name":"Perfect Whisperer","tier":"Master","id":"500","task":"Kill the Whisperer without taking avoidable damage 5 times without leaving."}',
          ],
        },
        fulltext: 'Perfect Whisperer',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Whisperer',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Xarpus': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Perfection","name":"Perfect Xarpus","tier":"Master","id":"248","task":"Kill Xarpus without anyone in the team taking any damage from Xarpus\' attacks and without letting an exhumed heal Xarpus more than twice.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Perfect Xarpus',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Xarpus',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Zalcano': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Zalcano","type":"Perfection","name":"Perfect Zalcano","tier":"Elite","id":"329","task":"Kill Zalcano 5 times in a row without leaving or getting hit by the following: Falling rocks, rock explosions, Zalcano powering up, or standing in a red symbol.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Perfect Zalcano',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Zalcano',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Zebak': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Perfection","name":"Perfect Zebak","tier":"Master","id":"439","task":"Defeat Zebak without anyone taking any damage from: poison, Zebak\'s basic attacks off-prayer, blood spawns and waves. You also must not push more than two jugs on the roar attack during the fight (you may destroy stationary ones). You must have all Zebak invocations activated.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Perfect Zebak',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Zebak',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfect Zulrah': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Zulrah","type":"Perfection","name":"Perfect Zulrah","tier":"Master","id":"229","task":"Kill Zulrah whilst taking no damage from the following: Snakelings, Venom Clouds, Zulrah\'s Green or Crimson phase.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Perfect Zulrah',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfect_Zulrah',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfection of Apmeken': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Perfection","name":"Perfection of Apmeken","tier":"Grandmaster","id":"437","task":"Complete \'Perfect Apmeken\' and \'Perfect Ba-Ba\' in a single run of the Tombs of Amascut.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Perfection of Apmeken',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfection_of_Apmeken',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfection of Crondis': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Perfection","name":"Perfection of Crondis","tier":"Grandmaster","id":"440","task":"Complete \'Perfect Crondis\' and \'Perfect Zebak\' in a single run of the Tombs of Amascut.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Perfection of Crondis',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfection_of_Crondis',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfection of Het': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Perfection","name":"Perfection of Het","tier":"Grandmaster","id":"434","task":"Complete \'Perfect Het\' and \'Perfect Akkha\' in a single run of the Tombs of Amascut.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Perfection of Het',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfection_of_Het',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfection of Scabaras': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Perfection","name":"Perfection of Scabaras","tier":"Grandmaster","id":"443","task":"Complete \'Perfect Scabaras\' and \'Perfect Kephri\' in a single run of Tombs of Amascut.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Perfection of Scabaras',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfection_of_Scabaras',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perfectly Balanced': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Mechanical","name":"Perfectly Balanced","tier":"Elite","id":"302","task":"Kill the Vanguards without them resetting their health.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Perfectly Balanced',
        fullurl: 'https://oldschool.runescape.wiki/w/Perfectly_Balanced',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perilous Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Moons of Peril","type":"Kill Count","name":"Perilous Champion","tier":"Hard","id":"530","task":"Open the Reward Chest 25 times.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Perilous Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Perilous_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perilous Dancer': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Moons of Peril","type":"Perfection","name":"Perilous Dancer","tier":"Hard","id":"531","task":"Defeat all the Moons in one run while only taking damage from regular attacks.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Perilous Dancer',
        fullurl: 'https://oldschool.runescape.wiki/w/Perilous_Dancer',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Perilous Novice': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Moons of Peril","type":"Kill Count","name":"Perilous Novice","tier":"Medium","id":"529","task":"Open the Reward Chest 5 times.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Perilous Novice',
        fullurl: 'https://oldschool.runescape.wiki/w/Perilous_Novice',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Personal Space': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Hard Mode","type":"Mechanical","name":"Personal Space","tier":"Grandmaster","id":"373","task":"Defeat the Pestilent Bloat in the Theatre of Blood: Hard Mode with a least 3 people in the room, without anyone in your team standing on top of each other.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Personal Space',
        fullurl: 'https://oldschool.runescape.wiki/w/Personal_Space',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Phantom Muspah Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phantom Muspah","type":"Kill Count","name":"Phantom Muspah Adept","tier":"Hard","id":"478","task":"Kill the Phantom Muspah.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Phantom Muspah Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Phantom_Muspah_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Phantom Muspah Manipulator': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phantom Muspah","type":"Perfection","name":"Phantom Muspah Manipulator","tier":"Grandmaster","id":"484","task":"Kill the Phantom Muspah whilst completing Walk Straight Pray True, Space is Tight & Can\'t Escape.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Phantom Muspah Manipulator',
        fullurl:
          'https://oldschool.runescape.wiki/w/Phantom_Muspah_Manipulator',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Phantom Muspah Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phantom Muspah","type":"Kill Count","name":"Phantom Muspah Master","tier":"Master","id":"480","task":"Kill the Phantom Muspah 50 times.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Phantom Muspah Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Phantom_Muspah_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Phantom Muspah Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phantom Muspah","type":"Speed","name":"Phantom Muspah Speed-Chaser","tier":"Master","id":"476","task":"Kill the Phantom Muspah in less than 2 minutes without a slayer task.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Phantom Muspah Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Phantom_Muspah_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Phantom Muspah Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phantom Muspah","type":"Speed","name":"Phantom Muspah Speed-Runner","tier":"Grandmaster","id":"477","task":"Kill the Phantom Muspah in less than 1 minute and 30 seconds without a slayer task.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Phantom Muspah Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Phantom_Muspah_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Phantom Muspah Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phantom Muspah","type":"Speed","name":"Phantom Muspah Speed-Trialist","tier":"Elite","id":"475","task":"Kill the Phantom Muspah in less than 3 minutes without a slayer task.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Phantom Muspah Speed-Trialist',
        fullurl:
          'https://oldschool.runescape.wiki/w/Phantom_Muspah_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Phantom Muspah Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phantom Muspah","type":"Kill Count","name":"Phantom Muspah Veteran","tier":"Elite","id":"479","task":"Kill the Phantom Muspah 25 times.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Phantom Muspah Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Phantom_Muspah_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Phosani's Grandmaster": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phosani\'s Nightmare","type":"Kill Count","name":"Phosani\'s Grandmaster","tier":"Grandmaster","id":"402","task":"Kill Phosani\'s Nightmare 25 times.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: "Phosani's Grandmaster",
        fullurl: 'https://oldschool.runescape.wiki/w/Phosani%27s_Grandmaster',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Phosani's Master": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phosani\'s Nightmare","type":"Kill Count","name":"Phosani\'s Master","tier":"Master","id":"401","task":"Kill Phosani\'s Nightmare 5 times.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: "Phosani's Master",
        fullurl: 'https://oldschool.runescape.wiki/w/Phosani%27s_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Phosani's Speedchaser": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phosani\'s Nightmare","type":"Speed","name":"Phosani\'s Speedchaser","tier":"Master","id":"404","task":"Defeat Phosani\'s Nightmare within 9 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: "Phosani's Speedchaser",
        fullurl: 'https://oldschool.runescape.wiki/w/Phosani%27s_Speedchaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Phosani's Speedrunner": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phosani\'s Nightmare","type":"Speed","name":"Phosani\'s Speedrunner","tier":"Grandmaster","id":"405","task":"Defeat Phosani\'s Nightmare within 7:30 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: "Phosani's Speedrunner",
        fullurl: 'https://oldschool.runescape.wiki/w/Phosani%27s_Speedrunner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Phosani's Veteran": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phosani\'s Nightmare","type":"Kill Count","name":"Phosani\'s Veteran","tier":"Elite","id":"400","task":"Kill Phosani\'s Nightmare once.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: "Phosani's Veteran",
        fullurl: 'https://oldschool.runescape.wiki/w/Phosani%27s_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Pillar Lover': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Hueycoatl","type":"Mechanical","name":"Pillar Lover","tier":"Hard","id":"572","task":"Kill the Hueycoatl whilst it is vulnerable.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Pillar Lover',
        fullurl: 'https://oldschool.runescape.wiki/w/Pillar_Lover',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Plant-Based Diet': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Hespori","type":"Restriction","name":"Plant-Based Diet","tier":"Elite","id":"126","task":"Kill Hespori without losing any prayer points.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Plant-Based Diet',
        fullurl: 'https://oldschool.runescape.wiki/w/Plant-Based_Diet',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Playing with Jads': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzKal-Zuk","type":"Mechanical","name":"Playing with Jads","tier":"Grandmaster","id":"344","task":"Complete wave 68 of the Inferno within 30 seconds of the first JalTok-Jad dying.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'Playing with Jads',
        fullurl: 'https://oldschool.runescape.wiki/w/Playing_with_Jads',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Playing with Lasers': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Perfection","name":"Playing with Lasers","tier":"Master","id":"315","task":"Clear the [[Jewelled_Crab|Crystal Crabs]] room without wasting an orb after the first crystal has been activated.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Playing with Lasers',
        fullurl: 'https://oldschool.runescape.wiki/w/Playing_with_Lasers',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Pop It': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Mechanical","name":"Pop It","tier":"Master","id":"241","task":"Kill Verzik without any Nylocas being frozen and without anyone taking damage from the Nylocas.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Pop It',
        fullurl: 'https://oldschool.runescape.wiki/w/Pop_It',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Pray for Success': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Barrows","type":"Perfection","name":"Pray for Success","tier":"Medium","id":"27","task":"Kill all six Barrows Brothers and loot the Barrows chest without taking any damage from any of the brothers.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Pray for Success',
        fullurl: 'https://oldschool.runescape.wiki/w/Pray_for_Success',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Prayer Smasher': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kalphite Queen","type":"Restriction","name":"Prayer Smasher","tier":"Elite","id":"161","task":"Kill the Kalphite Queen using only the Verac\'s Flail as a weapon.","leagueRegion":"Desert&Morytania"}',
          ],
        },
        fulltext: 'Prayer Smasher',
        fullurl: 'https://oldschool.runescape.wiki/w/Prayer_Smasher',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Praying to the Gods': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chaos Fanatic","type":"Restriction","name":"Praying to the Gods","tier":"Hard","id":"64","task":"Kill the Chaos Fanatic 10 times without drinking any potion which restores prayer or leaving the Wilderness.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Praying to the Gods',
        fullurl: 'https://oldschool.runescape.wiki/w/Praying_to_the_Gods',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Precise Positioning': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Skotizo","type":"Restriction","name":"Precise Positioning","tier":"Master","id":"50","task":"Kill Skotizo with the final source of damage being a Chinchompa explosion.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Precise Positioning',
        fullurl: 'https://oldschool.runescape.wiki/w/Precise_Positioning',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Preparation Is Key': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Bryophyta","type":"Perfection","name":"Preparation Is Key","tier":"Easy","id":"39","task":"Kill Bryophyta without suffering any poison damage.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Preparation Is Key',
        fullurl: 'https://oldschool.runescape.wiki/w/Preparation_Is_Key',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Prison Break': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Grotesque Guardians","type":"Mechanical","name":"Prison Break","tier":"Hard","id":"85","task":"Kill the Grotesque Guardians without taking damage from Dusk\'s prison attack.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Prison Break',
        fullurl: 'https://oldschool.runescape.wiki/w/Prison_Break',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Protection from Moss': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Bryophyta","type":"Mechanical","name":"Protection from Moss","tier":"Easy","id":"37","task":"Kill Bryophyta with the Protect from Magic prayer active.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Protection from Moss',
        fullurl: 'https://oldschool.runescape.wiki/w/Protection_from_Moss',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Putting It Olm on the Line': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Mechanical","name":"Putting It Olm on the Line","tier":"Master","id":"305","task":"Complete a Chambers of Xeric solo raid with more than 40,000 points.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Putting It Olm on the Line',
        fullurl:
          'https://oldschool.runescape.wiki/w/Putting_It_Olm_on_the_Line',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Quick Cutter': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Bryophyta","type":"Mechanical","name":"Quick Cutter","tier":"Medium","id":"38","task":"Kill all 3 of Bryophyta\'s growthlings within 3 seconds of the first one dying.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Quick Cutter',
        fullurl: 'https://oldschool.runescape.wiki/w/Quick_Cutter',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Rapid Reload': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tormented Demon","type":"Mechanical","name":"Rapid Reload","tier":"Elite","id":"555","task":"Hit three Tormented Demons within 3 seconds using a ballista or a crossbow."}',
          ],
        },
        fulltext: 'Rapid Reload',
        fullurl: 'https://oldschool.runescape.wiki/w/Rapid_Reload',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Rapid Succession': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Dagannoth Supreme","type":"Mechanical","name":"Rapid Succession","tier":"Elite","id":"236","task":"Kill all three Dagannoth Kings within 9 seconds of the first one.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Rapid Succession',
        fullurl: 'https://oldschool.runescape.wiki/w/Rapid_Succession',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Ready to Pounce': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Sarachnis","type":"Mechanical","name":"Ready to Pounce","tier":"Hard","id":"208","task":"Kill Sarachnis without her using her range attack twice in a row.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Ready to Pounce',
        fullurl: 'https://oldschool.runescape.wiki/w/Ready_to_Pounce',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Redemption Enthusiast': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Mechanical","name":"Redemption Enthusiast","tier":"Elite","id":"308","task":"Kill the Abyssal Portal without forcing Vespula to land.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Redemption Enthusiast',
        fullurl: 'https://oldschool.runescape.wiki/w/Redemption_Enthusiast',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Reflecting on This Encounter': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Basilisk Knight","type":"Kill Count","name":"Reflecting on This Encounter","tier":"Elite","id":"31","task":"Kill a Basilisk Knight.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Reflecting on This Encounter',
        fullurl:
          'https://oldschool.runescape.wiki/w/Reflecting_on_This_Encounter',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Reinforcements: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Fortis Colosseum","type":"Mechanical","name":"Reinforcements","tier":"Grandmaster","id":"547","task":"Defeat Sol Heredit with \\"Bees II\\", \\"Quartet\\" and \\"Solarflare II\\" modifiers active.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Reinforcements',
        fullurl: 'https://oldschool.runescape.wiki/w/Reinforcements',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Relaxxor: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Araxxor","type":"Restriction","name":"Relaxxor","tier":"Elite","id":"564","task":"Kill Araxxor after destroying six eggs.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Relaxxor',
        fullurl: 'https://oldschool.runescape.wiki/w/Relaxxor',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Reminisce: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Commander Zilyana","type":"Restriction","name":"Reminisce","tier":"Elite","id":"216","task":"Kill Commander Zilyana in a private instance with melee only.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Reminisce',
        fullurl: 'https://oldschool.runescape.wiki/w/Reminisce',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Resourceful Raider': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Restriction","name":"Resourceful Raider","tier":"Master","id":"426","task":"Complete the Tombs of Amascut with the \\"On a diet\\" and \\"Dehydration\\" invocations activated and without anyone dying.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Resourceful Raider',
        fullurl: 'https://oldschool.runescape.wiki/w/Resourceful_Raider',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Respiratory Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Abyssal Sire","type":"Mechanical","name":"Respiratory Runner","tier":"Elite","id":"4","task":"Kill the Abyssal Sire after only stunning him once.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Respiratory Runner',
        fullurl: 'https://oldschool.runescape.wiki/w/Respiratory_Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Rockin' around the croc": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Mechanical","name":"Rockin\' around the croc","tier":"Master","id":"455","task":"Defeat Zebak with all Zebak invocations activated and the path levelled up to at least four, without dying yourself.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: "Rockin' around the croc",
        fullurl: 'https://oldschool.runescape.wiki/w/Rockin%27_around_the_croc',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Royal Affairs': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Hard Mode","type":"Mechanical","name":"Royal Affairs","tier":"Grandmaster","id":"374","task":"In the Theatre of Blood: Hard Mode, complete the Nylocas room without ever letting the Nylocas Prinkipas change styles.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Royal Affairs',
        fullurl: 'https://oldschool.runescape.wiki/w/Royal_Affairs',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Sarachnis Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Sarachnis","type":"Kill Count","name":"Sarachnis Champion","tier":"Medium","id":"207","task":"Kill Sarachnis 25 times.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Sarachnis Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Sarachnis_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Sarachnis Novice': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Sarachnis","type":"Kill Count","name":"Sarachnis Novice","tier":"Easy","id":"206","task":"Kill Sarachnis 10 times.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Sarachnis Novice',
        fullurl: 'https://oldschool.runescape.wiki/w/Sarachnis_Novice',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Scorpia Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Scorpia","type":"Kill Count","name":"Scorpia Adept","tier":"Hard","id":"218","task":"Kill Scorpia 10 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Scorpia Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Scorpia_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Scorpia Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Scorpia","type":"Kill Count","name":"Scorpia Veteran","tier":"Elite","id":"219","task":"Kill Scorpia 25 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Scorpia Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Scorpia_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Scurrius Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Scurrius","type":"Kill Count","name":"Scurrius Champion","tier":"Medium","id":"522","task":"Kill Scurrius 10 times.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Scurrius Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Scurrius_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Scurrius Novice': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Scurrius","type":"Kill Count","name":"Scurrius Novice","tier":"Easy","id":"521","task":"Kill Scurrius once.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Scurrius Novice',
        fullurl: 'https://oldschool.runescape.wiki/w/Scurrius_Novice',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Serpentine Solo': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Leviathan","type":"Mechanical","name":"Serpentine Solo","tier":"Master","id":"510","task":"Kill the Leviathan without stunning the boss more than once."}',
          ],
        },
        fulltext: 'Serpentine Solo',
        fullurl: 'https://oldschool.runescape.wiki/w/Serpentine_Solo',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Shadows Move...': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Nex","type":"Mechanical","name":"Shadows Move...","tier":"Master","id":"420","task":"Kill Nex without anyone being hit by the Shadow Smash attack.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Shadows Move...',
        fullurl: 'https://oldschool.runescape.wiki/w/Shadows_Move...',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Shayzien Protector': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Lizardman Shaman","type":"Perfection","name":"Shayzien Protector","tier":"Easy","id":"175","task":"Kill a Lizardman Shaman in Molch which has not dealt damage to anyone. (excluding its Spawns)","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Shayzien Protector',
        fullurl: 'https://oldschool.runescape.wiki/w/Shayzien_Protector',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Shayzien Specialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Perfection","name":"Shayzien Specialist","tier":"Elite","id":"314","task":"Receive kill-credit for a Lizardman Shaman without taking damage from any shamans in the room.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Shayzien Specialist',
        fullurl: 'https://oldschool.runescape.wiki/w/Shayzien_Specialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Showboating: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Fortis Colosseum","type":"Mechanical","name":"Showboating","tier":"Master","id":"544","task":"Defeat Sol Heredit after using [[Fortis Salute]] to the north, east, south and west of the arena while he is below 10% hitpoints.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Showboating',
        fullurl: 'https://oldschool.runescape.wiki/w/Showboating',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Sit Back and Relax': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"None","type":"Mechanical","name":"Sit Back and Relax","tier":"Medium","id":"399","task":"Deal 100 damage to creatures using undead thralls.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Sit Back and Relax',
        fullurl: 'https://oldschool.runescape.wiki/w/Sit_Back_and_Relax',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Sit Rat': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Scurrius","type":"Restriction","name":"Sit Rat","tier":"Easy","id":"523","task":"Finish off Scurrius with a ratbane weapon in a private instance.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Sit Rat',
        fullurl: 'https://oldschool.runescape.wiki/w/Sit_Rat',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Skotizo Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Skotizo","type":"Kill Count","name":"Skotizo Adept","tier":"Hard","id":"45","task":"Kill Skotizo 5 times.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Skotizo Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Skotizo_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Skotizo Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Skotizo","type":"Kill Count","name":"Skotizo Champion","tier":"Medium","id":"44","task":"Kill Skotizo once.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Skotizo Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Skotizo_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Sleep Tight': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Nightmare","type":"Restriction","name":"Sleep Tight","tier":"Elite","id":"189","task":"Kill the Nightmare solo.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Sleep Tight',
        fullurl: 'https://oldschool.runescape.wiki/w/Sleep_Tight',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Sleeping Giant': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Obor","type":"Mechanical","name":"Sleeping Giant","tier":"Easy","id":"131","task":"Kill Obor whilst he is immobilized.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Sleeping Giant',
        fullurl: 'https://oldschool.runescape.wiki/w/Sleeping_Giant',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Slow Dancing in the Sand': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Fortis Colosseum","type":"Restriction","name":"Slow Dancing in the Sand","tier":"Grandmaster","id":"541","task":"Defeat Sol Heredit without running during the fight with him.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Slow Dancing in the Sand',
        fullurl: 'https://oldschool.runescape.wiki/w/Slow_Dancing_in_the_Sand',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Snake Rebound': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Zulrah","type":"Mechanical","name":"Snake Rebound","tier":"Elite","id":"227","task":"Kill Zulrah by using the Vengeance spell as the finishing blow.","leagueRegion":"Tirannwn&Fremennik"}',
          ],
        },
        fulltext: 'Snake Rebound',
        fullurl: 'https://oldschool.runescape.wiki/w/Snake_Rebound',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Snake. Snake!? Snaaaaaake!': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Zulrah","type":"Mechanical","name":"Snake. Snake!? Snaaaaaake!","tier":"Elite","id":"228","task":"Kill 3 Snakelings simultaneously.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Snake. Snake!? Snaaaaaake!',
        fullurl:
          'https://oldschool.runescape.wiki/w/Snake._Snake!%3F_Snaaaaaake!',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Something of an expert myself': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Mechanical","name":"Something of an expert myself","tier":"Master","id":"447","task":"Complete the Tombs of Amascut raid at level 350 or above without anyone dying.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Something of an expert myself',
        fullurl:
          'https://oldschool.runescape.wiki/w/Something_of_an_expert_myself',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Sorry, What Was That?': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chaos Fanatic","type":"Perfection","name":"Sorry, What Was That?","tier":"Medium","id":"63","task":"Kill the Chaos Fanatic without anyone being hit by his explosion attack.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Sorry, What Was That?',
        fullurl: 'https://oldschool.runescape.wiki/w/Sorry,_What_Was_That%3F',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Space is Tight': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phantom Muspah","type":"Mechanical","name":"Space is Tight","tier":"Master","id":"481","task":"Kill the Phantom Muspah whilst it is surrounded by spikes.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Space is Tight',
        fullurl: 'https://oldschool.runescape.wiki/w/Space_is_Tight',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Spec'd Out": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Thermonuclear Smoke Devil","type":"Restriction","name":"Spec\'d Out","tier":"Elite","id":"263","task":"Kill the Thermonuclear Smoke Devil using only special attacks.","leagueRegion":"Kandarin"}',
          ],
        },
        fulltext: "Spec'd Out",
        fullurl: 'https://oldschool.runescape.wiki/w/Spec%27d_Out',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Sportsmanship: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Fortis Colosseum","type":"Kill Count","name":"Sportsmanship","tier":"Master","id":"538","task":"Defeat Sol Heredit once.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Sportsmanship',
        fullurl: 'https://oldschool.runescape.wiki/w/Sportsmanship',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Squashing the Giant': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Obor","type":"Perfection","name":"Squashing the Giant","tier":"Medium","id":"133","task":"Kill Obor without taking any damage off prayer.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'Squashing the Giant',
        fullurl: 'https://oldschool.runescape.wiki/w/Squashing_the_Giant',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Static Awareness': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Grotesque Guardians","type":"Mechanical","name":"Static Awareness","tier":"Hard","id":"88","task":"Kill the Grotesque Guardians without being hit by any lightning attacks.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Static Awareness',
        fullurl: 'https://oldschool.runescape.wiki/w/Static_Awareness',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Stick 'em With the Pointy End": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vorkath","type":"Restriction","name":"Stick \'em With the Pointy End","tier":"Elite","id":"273","task":"Kill Vorkath using melee weapons only.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: "Stick 'em With the Pointy End",
        fullurl:
          'https://oldschool.runescape.wiki/w/Stick_%27em_With_the_Pointy_End',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Stop Drop and Roll': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Mechanical","name":"Stop Drop and Roll","tier":"Master","id":"309","task":"Kill Vasa Nistirio before he performs his teleport attack for the second time.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Stop Drop and Roll',
        fullurl: 'https://oldschool.runescape.wiki/w/Stop_Drop_and_Roll',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Stop Right There!': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Hard Mode","type":"Mechanical","name":"Stop Right There!","tier":"Grandmaster","id":"372","task":"Defeat the Maiden of Sugadinti in the Theatre of Blood: Hard Mode without letting blood spawns create more than 15 blood trails.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Stop Right There!',
        fullurl: 'https://oldschool.runescape.wiki/w/Stop_Right_There!',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Supplies? Who Needs 'em?": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzHaar-Ket-Rak\'s Challenges","type":"Perfection","name":"Supplies? Who Needs \'em?","tier":"Master","id":"369","task":"Complete TzHaar-Ket-Rak\'s third challenge without having anything in your inventory.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: "Supplies? Who Needs 'em?",
        fullurl:
          'https://oldschool.runescape.wiki/w/Supplies%3F_Who_Needs_%27em%3F',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Swimming in Venom': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Araxxor","type":"Restriction","name":"Swimming in Venom","tier":"Grandmaster","id":"565","task":"Kill Araxxor without the boss ever moving.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Swimming in Venom',
        fullurl: 'https://oldschool.runescape.wiki/w/Swimming_in_Venom',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Swoop No More': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kree\'arra","type":"Perfection","name":"Swoop No More","tier":"Master","id":"13","task":"Kill Kree\'arra in a private instance without taking any melee damage from the boss or his bodyguards.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Swoop No More',
        fullurl: 'https://oldschool.runescape.wiki/w/Swoop_No_More',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Team Player': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Zalcano","type":"Mechanical","name":"Team Player","tier":"Elite","id":"330","task":"Receive imbued tephra from a golem.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Team Player',
        fullurl: 'https://oldschool.runescape.wiki/w/Team_Player',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Team Work Makes the Dream Work': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Hard Mode","type":"Mechanical","name":"Team Work Makes the Dream Work","tier":"Grandmaster","id":"378","task":"When Verzik Vitur in the Theatre of Blood: Hard Mode uses her yellow power blast attack while the tornadoes are active, have everyone get through the attack without taking damage. This cannot be completed with one player alive","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Team Work Makes the Dream Work',
        fullurl:
          'https://oldschool.runescape.wiki/w/Team_Work_Makes_the_Dream_Work',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Temotli Triumph': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Amoxliatl","type":"Restriction","name":"Temotli Triumph","tier":"Medium","id":"584","task":"Kill Amoxliatl using only glacial temotli as a weapon.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Temotli Triumph',
        fullurl: 'https://oldschool.runescape.wiki/w/Temotli_Triumph',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Tempoross Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tempoross","type":"Kill Count","name":"Tempoross Champion","tier":"Medium","id":"354","task":"Subdue Tempoross 10 times.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Tempoross Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Tempoross_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Tempoross Novice': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tempoross","type":"Kill Count","name":"Tempoross Novice","tier":"Easy","id":"353","task":"Subdue Tempoross 5 times.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Tempoross Novice',
        fullurl: 'https://oldschool.runescape.wiki/w/Tempoross_Novice',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Ten-tacles': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kraken","type":"Stamina","name":"Ten-tacles","tier":"Elite","id":"171","task":"Kill the Kraken 50 times in a private instance without leaving the room.","leagueRegion":"Kandarin"}',
          ],
        },
        fulltext: 'Ten-tacles',
        fullurl: 'https://oldschool.runescape.wiki/w/Ten-tacles',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Tentacular: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Whisperer","type":"Restriction","name":"Tentacular","tier":"Elite","id":"501","task":"Kill the Whisperer whilst only being on the Arceuus spellbook."}',
          ],
        },
        fulltext: 'Tentacular',
        fullurl: 'https://oldschool.runescape.wiki/w/Tentacular',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Terrible Parent': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Nightmare","type":"Mechanical","name":"Terrible Parent","tier":"Grandmaster","id":"186","task":"Kill the Nightmare solo without the Parasites healing the boss for more than 100 health.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Terrible Parent',
        fullurl: 'https://oldschool.runescape.wiki/w/Terrible_Parent',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'The Bane of Demons': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"K\'ril Tsutsaroth","type":"Mechanical","name":"The Bane of Demons","tier":"Elite","id":"336","task":"Defeat K\'ril Tsutsaroth in a private instance using only demonbane spells.","leagueRegion":"Asgarnia, Kourend"}',
          ],
        },
        fulltext: 'The Bane of Demons',
        fullurl: 'https://oldschool.runescape.wiki/w/The_Bane_of_Demons',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'The Clone Zone': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Moons of Peril","type":"Mechanical","name":"The Clone Zone","tier":"Hard","id":"526","task":"Defeat the Eclipse moon by only attacking its clones.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'The Clone Zone',
        fullurl: 'https://oldschool.runescape.wiki/w/The_Clone_Zone',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'The Demonic Punching Bag': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Bloodveld","type":"Kill Count","name":"The Demonic Punching Bag","tier":"Easy","id":"33","task":"Kill a Bloodveld.","leagueRegion":"Asgarnia,Morytania,Kourend,Kandarin,Tirannwn,Wilderness"}',
          ],
        },
        fulltext: 'The Demonic Punching Bag',
        fullurl: 'https://oldschool.runescape.wiki/w/The_Demonic_Punching_Bag',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'The Flame Skipper': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Alchemical Hydra","type":"Mechanical","name":"The Flame Skipper","tier":"Master","id":"141","task":"Kill the Alchemical Hydra without letting it spawn a flame wall attack.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'The Flame Skipper',
        fullurl: 'https://oldschool.runescape.wiki/w/The_Flame_Skipper',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'The Flincher': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chaos Elemental","type":"Perfection","name":"The Flincher","tier":"Hard","id":"60","task":"Kill the Chaos Elemental without taking any damage from its attacks.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'The Flincher',
        fullurl: 'https://oldschool.runescape.wiki/w/The_Flincher',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'The Floor Is Lava': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzKal-Zuk","type":"Mechanical","name":"The Floor Is Lava","tier":"Grandmaster","id":"343","task":"Kill Tzkal-Zuk without letting Jal-ImKot dig during any wave in the Inferno.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'The Floor Is Lava',
        fullurl: 'https://oldschool.runescape.wiki/w/The_Floor_Is_Lava',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'The Fremennik Way': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vorkath","type":"Restriction","name":"The Fremennik Way","tier":"Grandmaster","id":"275","task":"Kill Vorkath with only your fists.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'The Fremennik Way',
        fullurl: 'https://oldschool.runescape.wiki/w/The_Fremennik_Way',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'The II Jad Challenge': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzHaar-Ket-Rak\'s Challenges","type":"Kill Count","name":"The II Jad Challenge","tier":"Elite","id":"361","task":"Complete TzHaar-Ket-Rak\'s second challenge.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'The II Jad Challenge',
        fullurl: 'https://oldschool.runescape.wiki/w/The_II_Jad_Challenge',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'The IV Jad Challenge': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzHaar-Ket-Rak\'s Challenges","type":"Kill Count","name":"The IV Jad Challenge","tier":"Master","id":"362","task":"Complete TzHaar-Ket-Rak\'s fourth challenge.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'The IV Jad Challenge',
        fullurl: 'https://oldschool.runescape.wiki/w/The_IV_Jad_Challenge',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'The Lone Angler': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tempoross","type":"Perfection","name":"The Lone Angler","tier":"Medium","id":"359","task":"Subdue Tempoross alone without getting hit by any fires, torrents or waves.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'The Lone Angler',
        fullurl: 'https://oldschool.runescape.wiki/w/The_Lone_Angler',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'The Spurned Hero': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Zalcano","type":"Mechanical","name":"The Spurned Hero","tier":"Elite","id":"331","task":"Kill Zalcano as the player who has dealt the most damage to her.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'The Spurned Hero',
        fullurl: 'https://oldschool.runescape.wiki/w/The_Spurned_Hero',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'The VI Jad Challenge': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzHaar-Ket-Rak\'s Challenges","type":"Kill Count","name":"The VI Jad Challenge","tier":"Grandmaster","id":"363","task":"Complete TzHaar-Ket-Rak\'s sixth challenge.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: 'The VI Jad Challenge',
        fullurl: 'https://oldschool.runescape.wiki/w/The_VI_Jad_Challenge',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'The Walk': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vorkath","type":"Mechanical","name":"The Walk","tier":"Master","id":"270","task":"Hit Vorkath 12 times during the acid special without getting hit by his rapid fire or the acid pools.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'The Walk',
        fullurl: 'https://oldschool.runescape.wiki/w/The_Walk',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'The Walking Volcano': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Fire Giant","type":"Kill Count","name":"The Walking Volcano","tier":"Easy","id":"80","task":"Kill a Fire Giant.","leagueRegion":"Desert,Kandarin,Karamja,Kourend,Misthalin,Wilderness"}',
          ],
        },
        fulltext: 'The Walking Volcano',
        fullurl: 'https://oldschool.runescape.wiki/w/The_Walking_Volcano',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'The Worst Ranged Weapon': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kree\'arra","type":"Restriction","name":"The Worst Ranged Weapon","tier":"Grandmaster","id":"14","task":"Kill Kree\'arra by only dealing damage to him with a salamander.","leagueRegion":"Asgarnia&Morytania,Asgarnia&Desert,Asgarnia&Kandarin,Asgarnia&Wilderness"}',
          ],
        },
        fulltext: 'The Worst Ranged Weapon',
        fullurl: 'https://oldschool.runescape.wiki/w/The_Worst_Ranged_Weapon',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre (4-Scale) Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Speed","name":"Theatre (4-Scale) Speed-Chaser","tier":"Master","id":"257","task":"Complete the Theatre of Blood (4-scale) in less than 17 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre (4-Scale) Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Theatre_(4-Scale)_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre (4-Scale) Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Speed","name":"Theatre (4-Scale) Speed-Runner","tier":"Grandmaster","id":"258","task":"Complete the Theatre of Blood (4-scale) in less than 15 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre (4-Scale) Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Theatre_(4-Scale)_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre (5-Scale) Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Speed","name":"Theatre (5-Scale) Speed-Chaser","tier":"Master","id":"259","task":"Complete the Theatre of Blood (5-scale) in less than 16 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre (5-Scale) Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Theatre_(5-Scale)_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre (5-Scale) Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Speed","name":"Theatre (5-Scale) Speed-Runner","tier":"Grandmaster","id":"260","task":"Complete the Theatre of Blood (5-scale) in less than 14 minutes and 15 seconds.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre (5-Scale) Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Theatre_(5-Scale)_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre (Duo) Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Speed","name":"Theatre (Duo) Speed-Runner","tier":"Grandmaster","id":"254","task":"Complete the Theatre of Blood (Duo) in less than 26 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre (Duo) Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Theatre_(Duo)_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre (Trio) Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Speed","name":"Theatre (Trio) Speed-Chaser","tier":"Master","id":"255","task":"Complete the Theatre of Blood (Trio) in less than 20 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre (Trio) Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Theatre_(Trio)_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre (Trio) Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Speed","name":"Theatre (Trio) Speed-Runner","tier":"Grandmaster","id":"256","task":"Complete the Theatre of Blood (Trio) in less than 17 minutes and 30 seconds.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre (Trio) Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Theatre_(Trio)_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre of Blood Grandmaster': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Kill Count","name":"Theatre of Blood Grandmaster","tier":"Grandmaster","id":"239","task":"Complete the Theatre of Blood 150 times.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre of Blood Grandmaster',
        fullurl:
          'https://oldschool.runescape.wiki/w/Theatre_of_Blood_Grandmaster',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre of Blood Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Kill Count","name":"Theatre of Blood Master","tier":"Master","id":"238","task":"Complete the Theatre of Blood 75 times.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre of Blood Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Theatre_of_Blood_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre of Blood Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Kill Count","name":"Theatre of Blood Veteran","tier":"Elite","id":"237","task":"Complete the Theatre of Blood 25 times.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre of Blood Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Theatre_of_Blood_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre of Blood: HM Grandmaster': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Hard Mode","type":"Kill Count","name":"Theatre of Blood: HM Grandmaster","tier":"Grandmaster","id":"385","task":"Complete the Theatre of Blood: Hard Mode 50 times.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre of Blood: HM Grandmaster',
        fullurl:
          'https://oldschool.runescape.wiki/w/Theatre_of_Blood:_HM_Grandmaster',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre of Blood: SM Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Entry Mode","type":"Kill Count","name":"Theatre of Blood: SM Adept","tier":"Hard","id":"397","task":"Complete the Theatre of Blood: Entry Mode 1 time.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre of Blood: SM Adept',
        fullurl:
          'https://oldschool.runescape.wiki/w/Theatre_of_Blood:_SM_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre of Blood: SM Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Entry Mode","type":"Speed","name":"Theatre of Blood: SM Speed-Chaser","tier":"Master","id":"396","task":"Complete the Theatre of Blood: Entry Mode in less than 17 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre of Blood: SM Speed-Chaser',
        fullurl:
          'https://oldschool.runescape.wiki/w/Theatre_of_Blood:_SM_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre: HM (4-Scale) Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Hard Mode","type":"Speed","name":"Theatre: HM (4-Scale) Speed-Runner","tier":"Grandmaster","id":"383","task":"Complete the Theatre of Blood: Hard Mode (4-scale) with an overall time of less than 21 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre: HM (4-Scale) Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Theatre:_HM_(4-Scale)_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre: HM (5-Scale) Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Hard Mode","type":"Speed","name":"Theatre: HM (5-Scale) Speed-Runner","tier":"Grandmaster","id":"384","task":"Complete the Theatre of Blood: Hard Mode (5-scale) with an overall time of less than 19 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre: HM (5-Scale) Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Theatre:_HM_(5-Scale)_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Theatre: HM (Trio) Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Hard Mode","type":"Speed","name":"Theatre: HM (Trio) Speed-Runner","tier":"Grandmaster","id":"382","task":"Complete the Theatre of Blood: Hard Mode (Trio) with an overall time of less than 23 minutes.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Theatre: HM (Trio) Speed-Runner',
        fullurl:
          'https://oldschool.runescape.wiki/w/Theatre:_HM_(Trio)_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'There is no escape!': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Nex","type":"Mechanical","name":"There is no escape!","tier":"Master","id":"415","task":"Kill Nex without anyone being hit by the Smoke Dash special attack.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'There is no escape!',
        fullurl: 'https://oldschool.runescape.wiki/w/There_is_no_escape!',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Thermonuclear Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Thermonuclear Smoke Devil","type":"Kill Count","name":"Thermonuclear Veteran","tier":"Elite","id":"261","task":"Kill the Thermonuclear Smoke Devil 20 times.","leagueRegion":"Kandarin"}',
          ],
        },
        fulltext: 'Thermonuclear Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Thermonuclear_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'They Grow Up Too Fast': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Abyssal Sire","type":"Mechanical","name":"They Grow Up Too Fast","tier":"Hard","id":"3","task":"Kill the Abyssal Sire without letting any Scion mature.","leagueRegion":"Misthalin"}',
          ],
        },
        fulltext: 'They Grow Up Too Fast',
        fullurl: 'https://oldschool.runescape.wiki/w/They_Grow_Up_Too_Fast',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "They Won't Expect This": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood: Entry Mode","type":"Mechanical","name":"They Won\'t Expect This","tier":"Elite","id":"388","task":"In the Theatre of Blood: Entry Mode, enter the Pestilent Bloat room from the opposite side.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: "They Won't Expect This",
        fullurl: 'https://oldschool.runescape.wiki/w/They_Won%27t_Expect_This',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Three Times the Thrashing': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tormented Demon","type":"Restriction","name":"Three Times the Thrashing","tier":"Master","id":"554","task":"Kill three Tormented Demons within 3 seconds."}',
          ],
        },
        fulltext: 'Three Times the Thrashing',
        fullurl: 'https://oldschool.runescape.wiki/w/Three_Times_the_Thrashing',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Through Fire and Flames': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tormented Demon","type":"Restriction","name":"Through Fire and Flames","tier":"Elite","id":"552","task":"Kill a Tormented Demon whilst their shield is inactive."}',
          ],
        },
        fulltext: 'Through Fire and Flames',
        fullurl: 'https://oldschool.runescape.wiki/w/Through_Fire_and_Flames',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Together We'll Fall": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Mechanical","name":"Together We\'ll Fall","tier":"Elite","id":"303","task":"Kill the Vanguards within 10 seconds of the first one dying.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: "Together We'll Fall",
        fullurl: 'https://oldschool.runescape.wiki/w/Together_We%27ll_Fall',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Tomb Explorer': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Kill Count","name":"Tomb Explorer","tier":"Elite","id":"468","task":"Complete the Tombs of Amascut once.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Tomb Explorer',
        fullurl: 'https://oldschool.runescape.wiki/w/Tomb_Explorer',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Tomb Looter': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Kill Count","name":"Tomb Looter","tier":"Master","id":"466","task":"Complete the Tombs of Amascut 25 times.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Tomb Looter',
        fullurl: 'https://oldschool.runescape.wiki/w/Tomb_Looter',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Tomb Raider': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Kill Count","name":"Tomb Raider","tier":"Master","id":"467","task":"Complete the Tombs of Amascut 50 times.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Tomb Raider',
        fullurl: 'https://oldschool.runescape.wiki/w/Tomb_Raider',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Tombs Speed Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Speed","name":"Tombs Speed Runner","tier":"Master","id":"421","task":"Complete the Tombs of Amascut (normal) within 18 mins at any group size.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Tombs Speed Runner',
        fullurl: 'https://oldschool.runescape.wiki/w/Tombs_Speed_Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Tombs Speed Runner II': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Speed","name":"Tombs Speed Runner II","tier":"Grandmaster","id":"422","task":"Complete the Tombs of Amascut (expert) within 20 mins at any group size.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Tombs Speed Runner II',
        fullurl: 'https://oldschool.runescape.wiki/w/Tombs_Speed_Runner_II',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Tombs Speed Runner III': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Speed","name":"Tombs Speed Runner III","tier":"Grandmaster","id":"423","task":"Complete the Tombs of Amascut (expert) within 18 mins in a group of 8.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Tombs Speed Runner III',
        fullurl: 'https://oldschool.runescape.wiki/w/Tombs_Speed_Runner_III',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Toppling the Diarchy': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Dagannoth Rex","type":"Mechanical","name":"Toppling the Diarchy","tier":"Elite","id":"205","task":"Kill Dagannoth Rex and one other Dagannoth king at the exact same time.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Toppling the Diarchy',
        fullurl: 'https://oldschool.runescape.wiki/w/Toppling_the_Diarchy',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Totally Shattered': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Amoxliatl","type":"Mechanical","name":"Totally Shattered","tier":"Hard","id":"587","task":"Kill Amoxliatl without any of her unstable ice shattering.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Totally Shattered',
        fullurl: 'https://oldschool.runescape.wiki/w/Totally_Shattered',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Two Times the Torment': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tormented Demon","type":"Restriction","name":"Two Times the Torment","tier":"Elite","id":"553","task":"Kill two Tormented Demons within 2 seconds."}',
          ],
        },
        fulltext: 'Two Times the Torment',
        fullurl: 'https://oldschool.runescape.wiki/w/Two_Times_the_Torment',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Two-Down': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Theatre of Blood","type":"Mechanical","name":"Two-Down","tier":"Master","id":"240","task":"Kill the Pestilent Bloat before he shuts down for the third time.","leagueRegion":"Morytania"}',
          ],
        },
        fulltext: 'Two-Down',
        fullurl: 'https://oldschool.runescape.wiki/w/Two-Down',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "TzHaar-Ket-Rak's Speed-Chaser": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzHaar-Ket-Rak\'s Challenges","type":"Speed","name":"TzHaar-Ket-Rak\'s Speed-Chaser","tier":"Master","id":"365","task":"Complete TzHaar-Ket-Rak\'s third challenge in less than 3 minutes.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: "TzHaar-Ket-Rak's Speed-Chaser",
        fullurl:
          'https://oldschool.runescape.wiki/w/TzHaar-Ket-Rak%27s_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "TzHaar-Ket-Rak's Speed-Runner": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzHaar-Ket-Rak\'s Challenges","type":"Speed","name":"TzHaar-Ket-Rak\'s Speed-Runner","tier":"Grandmaster","id":"366","task":"Complete TzHaar-Ket-Rak\'s fifth challenge in less than 5 minutes.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: "TzHaar-Ket-Rak's Speed-Runner",
        fullurl:
          'https://oldschool.runescape.wiki/w/TzHaar-Ket-Rak%27s_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "TzHaar-Ket-Rak's Speed-Trialist": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzHaar-Ket-Rak\'s Challenges","type":"Speed","name":"TzHaar-Ket-Rak\'s Speed-Trialist","tier":"Elite","id":"364","task":"Complete TzHaar-Ket-Rak\'s first challenge in less than 45 seconds.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: "TzHaar-Ket-Rak's Speed-Trialist",
        fullurl:
          'https://oldschool.runescape.wiki/w/TzHaar-Ket-Rak%27s_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Unconventional: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Leviathan","type":"Restriction","name":"Unconventional","tier":"Grandmaster","id":"511","task":"Kill the Leviathan using only Mithril ammunition whilst having no more than 25 Hitpoints throughout the entire fight."}',
          ],
        },
        fulltext: 'Unconventional',
        fullurl: 'https://oldschool.runescape.wiki/w/Unconventional',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Undying Raid Team': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Perfection","name":"Undying Raid Team","tier":"Elite","id":"312","task":"Complete a Chambers of Xeric raid without anyone dying.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Undying Raid Team',
        fullurl: 'https://oldschool.runescape.wiki/w/Undying_Raid_Team',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Undying Raider': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Chambers of Xeric","type":"Perfection","name":"Undying Raider","tier":"Master","id":"313","task":"Complete a Chambers of Xeric solo raid without dying.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Undying Raider',
        fullurl: 'https://oldschool.runescape.wiki/w/Undying_Raider',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Unending Torment': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tormented Demon","type":"Kill Count","name":"Unending Torment","tier":"Elite","id":"551","task":"Kill a Tormented Demon."}',
          ],
        },
        fulltext: 'Unending Torment',
        fullurl: 'https://oldschool.runescape.wiki/w/Unending_Torment',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Unnecessary Optimisation': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Kraken","type":"Mechanical","name":"Unnecessary Optimisation","tier":"Hard","id":"169","task":"Kill the Kraken after killing all four tentacles.","leagueRegion":"Kandarin"}',
          ],
        },
        fulltext: 'Unnecessary Optimisation',
        fullurl: 'https://oldschool.runescape.wiki/w/Unnecessary_Optimisation',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Unrequired Antifire': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Cerberus","type":"Perfection","name":"Unrequired Antifire","tier":"Elite","id":"55","task":"Kill Cerberus without taking damage from any lava pools.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Unrequired Antifire',
        fullurl: 'https://oldschool.runescape.wiki/w/Unrequired_Antifire',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Unrequired Antipoisons': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Alchemical Hydra","type":"Mechanical","name":"Unrequired Antipoisons","tier":"Master","id":"137","task":"Kill the Alchemical Hydra without being hit by the acid pool attack.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Unrequired Antipoisons',
        fullurl: 'https://oldschool.runescape.wiki/w/Unrequired_Antipoisons',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Up for the Challenge': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Skotizo","type":"Restriction","name":"Up for the Challenge","tier":"Elite","id":"49","task":"Kill Skotizo without equipping a demonbane weapon.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Up for the Challenge',
        fullurl: 'https://oldschool.runescape.wiki/w/Up_for_the_Challenge',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Vardorvis Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vardorvis","type":"Kill Count","name":"Vardorvis Adept","tier":"Elite","id":"488","task":"Kill Vardorvis once.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Vardorvis Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Vardorvis_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Vardorvis Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vardorvis","type":"Kill Count","name":"Vardorvis Master","tier":"Master","id":"489","task":"Kill Vardorvis 50 times.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Vardorvis Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Vardorvis_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Vardorvis Sleeper': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vardorvis","type":"Kill Count","name":"Vardorvis Sleeper","tier":"Grandmaster","id":"490","task":"Kill Awakened Vardorvis.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Vardorvis Sleeper',
        fullurl: 'https://oldschool.runescape.wiki/w/Vardorvis_Sleeper',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Vardorvis Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vardorvis","type":"Speed","name":"Vardorvis Speed-Chaser","tier":"Master","id":"486","task":"Kill Vardorvis in less than 1:05 without a slayer task.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Vardorvis Speed-Chaser',
        fullurl: 'https://oldschool.runescape.wiki/w/Vardorvis_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Vardorvis Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vardorvis","type":"Speed","name":"Vardorvis Speed-Runner","tier":"Grandmaster","id":"487","task":"Kill Vardorvis in less than 0:55 without a slayer task.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Vardorvis Speed-Runner',
        fullurl: 'https://oldschool.runescape.wiki/w/Vardorvis_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Vardorvis Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vardorvis","type":"Speed","name":"Vardorvis Speed-Trialist","tier":"Elite","id":"485","task":"Kill Vardorvis in less than 1:15 minutes without a slayer task.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: 'Vardorvis Speed-Trialist',
        fullurl: 'https://oldschool.runescape.wiki/w/Vardorvis_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Venenatis Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Venenatis","type":"Kill Count","name":"Venenatis Adept","tier":"Hard","id":"264","task":"Kill Venenatis 10 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Venenatis Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Venenatis_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Venenatis Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Venenatis","type":"Kill Count","name":"Venenatis Veteran","tier":"Elite","id":"265","task":"Kill Venenatis 20 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Venenatis Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Venenatis_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Versatile Drainer': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phantom Muspah","type":"Mechanical","name":"Versatile Drainer","tier":"Elite","id":"482","task":"Drain the Phantom Muspah\'s Prayer with three different sources in one kill.","leagueRegion":"Fremennik&Asgarnia,Fremennik&Kourend"}',
          ],
        },
        fulltext: 'Versatile Drainer',
        fullurl: 'https://oldschool.runescape.wiki/w/Versatile_Drainer',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Vet'eran": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vet\'ion","type":"Kill Count","name":"Vet\'eran","tier":"Elite","id":"267","task":"Kill Vet\'ion 20 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: "Vet'eran",
        fullurl: 'https://oldschool.runescape.wiki/w/Vet%27eran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Vet'ion Adept": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vet\'ion","type":"Kill Count","name":"Vet\'ion Adept","tier":"Hard","id":"266","task":"Kill Vet\'ion 10 times.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: "Vet'ion Adept",
        fullurl: 'https://oldschool.runescape.wiki/w/Vet%27ion_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Vorkath Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vorkath","type":"Kill Count","name":"Vorkath Master","tier":"Master","id":"269","task":"Kill Vorkath 100 times.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Vorkath Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Vorkath_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Vorkath Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vorkath","type":"Speed","name":"Vorkath Speed-Chaser","tier":"Master","id":"276","task":"Kill Vorkath in less than 1 minute and 15 seconds.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Vorkath Speed-Chaser',
        fullurl: 'https://oldschool.runescape.wiki/w/Vorkath_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Vorkath Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vorkath","type":"Speed","name":"Vorkath Speed-Runner","tier":"Grandmaster","id":"277","task":"Kill Vorkath in less than 54 seconds.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Vorkath Speed-Runner',
        fullurl: 'https://oldschool.runescape.wiki/w/Vorkath_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Vorkath Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vorkath","type":"Kill Count","name":"Vorkath Veteran","tier":"Elite","id":"268","task":"Kill Vorkath 50 times.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Vorkath Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Vorkath_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Walk Straight Pray True': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Phantom Muspah","type":"Perfection","name":"Walk Straight Pray True","tier":"Master","id":"483","task":"Kill the Phantom Muspah without taking any avoidable damage.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Walk Straight Pray True',
        fullurl: 'https://oldschool.runescape.wiki/w/Walk_Straight_Pray_True',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Warden't you believe it": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut: Expert Mode","type":"Mechanical","name":"Warden\'t you believe it","tier":"Master","id":"460","task":"Defeat the Wardens with all Wardens invocations activated, at expert level and without dying yourself.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: "Warden't you believe it",
        fullurl: 'https://oldschool.runescape.wiki/w/Warden%27t_you_believe_it',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Wasn't Even Close": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzKal-Zuk","type":"Restriction","name":"Wasn\'t Even Close","tier":"Grandmaster","id":"347","task":"Kill Tzkal-Zuk without letting your hitpoints fall below 50 during any wave in the Inferno.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: "Wasn't Even Close",
        fullurl: 'https://oldschool.runescape.wiki/w/Wasn%27t_Even_Close',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Weed Whacker': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Hespori","type":"Mechanical","name":"Weed Whacker","tier":"Hard","id":"125","task":"Kill all of Hesporis flowers within 5 seconds.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Weed Whacker',
        fullurl: 'https://oldschool.runescape.wiki/w/Weed_Whacker',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Whack-a-Mole': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Giant Mole","type":"Mechanical","name":"Whack-a-Mole","tier":"Hard","id":"181","task":"Kill the Giant Mole within 10 seconds of her resurfacing.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Whack-a-Mole',
        fullurl: 'https://oldschool.runescape.wiki/w/Whack-a-Mole',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      Whispered: {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Whisperer","type":"Kill Count","name":"Whispered","tier":"Grandmaster","id":"499","task":"Kill the Awakened Whisperer."}',
          ],
        },
        fulltext: 'Whispered',
        fullurl: 'https://oldschool.runescape.wiki/w/Whispered',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Whisperer Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Whisperer","type":"Kill Count","name":"Whisperer Adept","tier":"Elite","id":"497","task":"Kill the Whisperer once."}',
          ],
        },
        fulltext: 'Whisperer Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Whisperer_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Whisperer Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Whisperer","type":"Kill Count","name":"Whisperer Master","tier":"Master","id":"498","task":"Kill the Whisperer 50 times."}',
          ],
        },
        fulltext: 'Whisperer Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Whisperer_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Whisperer Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Whisperer","type":"Speed","name":"Whisperer Speed-Chaser","tier":"Master","id":"495","task":"Kill the Whisperer in less than 2:25 without a slayer task."}',
          ],
        },
        fulltext: 'Whisperer Speed-Chaser',
        fullurl: 'https://oldschool.runescape.wiki/w/Whisperer_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Whisperer Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Whisperer","type":"Speed","name":"Whisperer Speed-Runner","tier":"Grandmaster","id":"496","task":"Kill the Whisperer in less than 2:05 without a slayer task."}',
          ],
        },
        fulltext: 'Whisperer Speed-Runner',
        fullurl: 'https://oldschool.runescape.wiki/w/Whisperer_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Whisperer Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Whisperer","type":"Speed","name":"Whisperer Speed-Trialist","tier":"Elite","id":"494","task":"Kill the Whisperer in less than 3:00 without a slayer task."}',
          ],
        },
        fulltext: 'Whisperer Speed-Trialist',
        fullurl: 'https://oldschool.runescape.wiki/w/Whisperer_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Who Is the King Now?': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"King Black Dragon","type":"Stamina","name":"Who Is the King Now?","tier":"Hard","id":"167","task":"Kill The King Black Dragon 10 times in a private instance without leaving the instance.","leagueRegion":"Wilderness"}',
          ],
        },
        fulltext: 'Who Is the King Now?',
        fullurl: 'https://oldschool.runescape.wiki/w/Who_Is_the_King_Now%3F',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Why Are You Running?': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Giant Mole","type":"Mechanical","name":"Why Are You Running?","tier":"Hard","id":"179","task":"Kill the Giant Mole without her burrowing more than 2 times.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Why Are You Running?',
        fullurl: 'https://oldschool.runescape.wiki/w/Why_Are_You_Running%3F',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Why Cook?': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tempoross","type":"Mechanical","name":"Why Cook?","tier":"Hard","id":"358","task":"Subdue Tempoross, getting rewarded with 10 reward permits from a single Tempoross fight.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'Why Cook?',
        fullurl: 'https://oldschool.runescape.wiki/w/Why_Cook%3F',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Why Fletch?': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Wintertodt","type":"Stamina","name":"Why Fletch?","tier":"Hard","id":"286","task":"Subdue the Wintertodt after earning 3000 or more points.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Why Fletch?',
        fullurl: 'https://oldschool.runescape.wiki/w/Why_Fletch%3F',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Wintertodt Champion': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Wintertodt","type":"Kill Count","name":"Wintertodt Champion","tier":"Medium","id":"280","task":"Subdue the Wintertodt 10 times.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Wintertodt Champion',
        fullurl: 'https://oldschool.runescape.wiki/w/Wintertodt_Champion',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Wintertodt Novice': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Wintertodt","type":"Kill Count","name":"Wintertodt Novice","tier":"Easy","id":"279","task":"Subdue the Wintertodt 5 times.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Wintertodt Novice',
        fullurl: 'https://oldschool.runescape.wiki/w/Wintertodt_Novice',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "Without Ralos' Light": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Amoxliatl","type":"Restriction","name":"Without Ralos\' Light","tier":"Elite","id":"585","task":"Kill Amoxliatl without losing any prayer points.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: "Without Ralos' Light",
        fullurl: 'https://oldschool.runescape.wiki/w/Without_Ralos%27_Light',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Wolf Puncher': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Crystalline Hunllef","type":"Restriction","name":"Wolf Puncher","tier":"Elite","id":"116","task":"Kill the Crystalline Hunllef without making more than one attuned weapon.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Wolf Puncher',
        fullurl: 'https://oldschool.runescape.wiki/w/Wolf_Puncher',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Wolf Puncher II': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Corrupted Hunllef","type":"Restriction","name":"Wolf Puncher II","tier":"Grandmaster","id":"106","task":"Kill the Corrupted Hunllef without making more than one attuned weapon.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Wolf Puncher II',
        fullurl: 'https://oldschool.runescape.wiki/w/Wolf_Puncher_II',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Working Overtime': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Alchemical Hydra","type":"Stamina","name":"Working Overtime","tier":"Master","id":"146","task":"Kill the Alchemical Hydra 15 times without leaving the room.","leagueRegion":"Kourend"}',
          ],
        },
        fulltext: 'Working Overtime',
        fullurl: 'https://oldschool.runescape.wiki/w/Working_Overtime',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Yarr No More': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"K\'ril Tsutsaroth","type":"Mechanical","name":"Yarr No More","tier":"Hard","id":"334","task":"Receive kill-credit for K\'ril Tsutsaroth without him using his special attack.","leagueRegion":"Asgarnia"}',
          ],
        },
        fulltext: 'Yarr No More',
        fullurl: 'https://oldschool.runescape.wiki/w/Yarr_No_More',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "You Didn't Say Anything About a Bat": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"TzTok-Jad","type":"Mechanical","name":"You Didn\'t Say Anything About a Bat","tier":"Master","id":"152","task":"Complete the Fight Caves without being attacked by a Tz-Kih.","leagueRegion":"Karamja"}',
          ],
        },
        fulltext: "You Didn't Say Anything About a Bat",
        fullurl:
          'https://oldschool.runescape.wiki/w/You_Didn%27t_Say_Anything_About_a_Bat',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'You are not prepared': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Tombs of Amascut","type":"Restriction","name":"You are not prepared","tier":"Master","id":"424","task":"Complete a full Tombs of Amascut raid only using supplies given inside the tomb and without anyone dying.","leagueRegion":"Desert"}',
          ],
        },
        fulltext: 'You are not prepared',
        fullurl: 'https://oldschool.runescape.wiki/w/You_are_not_prepared',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      "You're a wizard": {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"The Hueycoatl","type":"Restriction","name":"You\'re a wizard","tier":"Medium","id":"574","task":"Kill the Hueycoatl using only earth spells.","leagueRegion":"Varlamore"}',
          ],
        },
        fulltext: "You're a wizard",
        fullurl: 'https://oldschool.runescape.wiki/w/You%27re_a_wizard',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Zalcano Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Zalcano","type":"Kill Count","name":"Zalcano Veteran","tier":"Elite","id":"328","task":"Kill Zalcano 25 times.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Zalcano Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Zalcano_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Zombie Destroyer': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Vorkath","type":"Restriction","name":"Zombie Destroyer","tier":"Elite","id":"271","task":"Kill Vorkath\'s zombified spawn without using crumble undead.","leagueRegion":"Fremennik"}',
          ],
        },
        fulltext: 'Zombie Destroyer',
        fullurl: 'https://oldschool.runescape.wiki/w/Zombie_Destroyer',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Zulrah Adept': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Zulrah","type":"Kill Count","name":"Zulrah Adept","tier":"Hard","id":"224","task":"Kill Zulrah 25 times.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Zulrah Adept',
        fullurl: 'https://oldschool.runescape.wiki/w/Zulrah_Adept',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Zulrah Master': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Zulrah","type":"Kill Count","name":"Zulrah Master","tier":"Master","id":"226","task":"Kill Zulrah 150 times.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Zulrah Master',
        fullurl: 'https://oldschool.runescape.wiki/w/Zulrah_Master',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Zulrah Speed-Chaser': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Zulrah","type":"Speed","name":"Zulrah Speed-Chaser","tier":"Master","id":"231","task":"Kill Zulrah in less than 1 minute, without a slayer task.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Zulrah Speed-Chaser',
        fullurl: 'https://oldschool.runescape.wiki/w/Zulrah_Speed-Chaser',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Zulrah Speed-Runner': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Zulrah","type":"Speed","name":"Zulrah Speed-Runner","tier":"Grandmaster","id":"232","task":"Kill Zulrah in less than 54 seconds, without a slayer task.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Zulrah Speed-Runner',
        fullurl: 'https://oldschool.runescape.wiki/w/Zulrah_Speed-Runner',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Zulrah Speed-Trialist': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Zulrah","type":"Speed","name":"Zulrah Speed-Trialist","tier":"Elite","id":"230","task":"Kill Zulrah in less than 1 minute 20 seconds, without a slayer task.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Zulrah Speed-Trialist',
        fullurl: 'https://oldschool.runescape.wiki/w/Zulrah_Speed-Trialist',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
      'Zulrah Veteran': {
        printouts: {
          'Combat Achievement JSON': [
            '{"monster":"Zulrah","type":"Kill Count","name":"Zulrah Veteran","tier":"Elite","id":"225","task":"Kill Zulrah 75 times.","leagueRegion":"Tirannwn"}',
          ],
        },
        fulltext: 'Zulrah Veteran',
        fullurl: 'https://oldschool.runescape.wiki/w/Zulrah_Veteran',
        namespace: 0,
        exists: '1',
        displaytitle: '',
      },
    },
    serializer: 'SMW\\Serializers\\QueryResultSerializer',
    version: 2,
    meta: {
      hash: 'a5e3eaa1490d280da330a62123ea9a6f',
      count: 594,
      offset: 0,
      source: '',
      time: '0.068085',
    },
  },
} satisfies CombatAchievementListResponse;
