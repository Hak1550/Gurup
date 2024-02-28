#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>

#import <React/RCTConvert.h>


#import <OneSignal/OneSignal.h>
#import <react-native-orientation-locker/Orientation.h>
#import <EXScreenOrientation/EXScreenOrientationViewController.h>

//#ifdef FB_SONARKIT_ENABLED
//#import <FlipperKit/FlipperClient.h>
//#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
//#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
//#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
//#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
//#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
//
//
//static void InitializeFlipper(UIApplication *application) {
//  FlipperClient *client = [FlipperClient sharedClient];
//  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
//  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
//  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
//  [client addPlugin:[FlipperKitReactPlugin new]];
//  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
//  [client start];
//}
//#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//#ifdef FB_SONARKIT_ENABLED
//  InitializeFlipper(application);
//#endif
  

  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];

  [super application:application didFinishLaunchingWithOptions:launchOptions];
  
  //Remove this method to stop OneSignal Debugging
  // [OneSignal setLogLevel:ONE_S_LL_VERBOSE visualLevel:ONE_S_LL_NONE];
  
  //START OneSignal initialization code
  [OneSignal initWithLaunchOptions:launchOptions
   appId:@"cafecf95-abde-48ba-9eae-bb07b92b0797" // gurucan appId
  //  appId:@"8280a33c-771d-4efd-b8f8-fcce12ee835b" // my appId
   handleNotificationAction:nil
   settings:@{kOSSettingsKeyAutoPrompt: @false, kOSSettingsKeyInAppLaunchURL: @false}];
  OneSignal.inFocusDisplayType = OSNotificationDisplayTypeNotification;

  // promptForPushNotifications will show the native iOS notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
  [OneSignal promptForPushNotificationsWithUserResponse:^(BOOL accepted) {
    NSLog(@"User accepted notifications: %d", accepted);
  }];
  
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
   RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"main" initialProperties:nil];
   id rootViewBackgroundColor = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"RCTRootViewBackgroundColor"];
   if (rootViewBackgroundColor != nil) {
     rootView.backgroundColor = [RCTConvert UIColor:rootViewBackgroundColor];
   } else {
     rootView.backgroundColor = [UIColor whiteColor];
   }
  
   self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
   UIViewController *rootViewController = [UIViewController new];
   rootViewController.view = rootView;
   self.window.rootViewController = rootViewController;
   [self.window makeKeyAndVisible];
  
  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(nonnull NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
  [[FBSDKApplicationDelegate sharedInstance] application:application
                                                 openURL:url
                                                 options:options];
  return YES;
}



- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge
{
  return @[];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
 #ifdef DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
 #else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
 #endif
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

@end
