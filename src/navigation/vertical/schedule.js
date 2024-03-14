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
        icon: { icon: 'mdi-comment-plus-outline' },
        to: { name: 'new-campaigns' },
        },
        {
          title: 'Campaign Portfolio',
        icon: { icon: 'mdi-message-text-outline' },
        to: { name: 'campaign-portfolio' },
        },
        {
          title: 'Campaign Performance',
        icon: { icon: 'mdi-message-text-outline' },
        to: { name: 'campaign-performance' },
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
