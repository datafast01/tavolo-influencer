export default [
 
   {
    title: 'Campaigns',
    icon: { icon: 'mdi-voice' },
     children: [
      {
        title: 'Emails Campaigns',
        icon: { icon: 'mdi-email' },
       children: [
        {
          title: 'New Campaigns',
        icon: { icon: 'mdi-message-text-outline' },
        to: { name: 'schedule-messages' },
        },
        {
          title: 'Campaign Portfolio',
        icon: { icon: 'mdi-message-text-outline' },
        to: { name: 'schedule-messages' },
        },
        {
          title: 'Campaign Performance',
        icon: { icon: 'mdi-message-text-outline' },
        to: { name: 'schedule-messages' },
        }
       ]
      },
      {
        title: 'Messages Campaigns',
        icon: { icon: 'mdi-message-text-outline' },
        to: { name: 'schedule-messages' },
      },
   ]
   
  },
  
]
