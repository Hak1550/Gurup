//
//  RTCWhiteLabelModule.m
//  Gurucan
//
//  Created by Егор Зотов on 27.01.2021.
//

// RCTCalendarModule.m
#import "RCTWhiteLabelModule.h"

@implementation RCTWhiteLabelModule

RCT_EXPORT_METHOD(getConfig:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    NSString *path = [[NSBundle mainBundle] pathForResource:@"WhiteLabel" ofType:@"plist"];
    NSDictionary *gurucanConfig = [NSDictionary dictionaryWithContentsOfFile:path];
    resolve(gurucanConfig);
}

// To export a module named WhiteLabel
RCT_EXPORT_MODULE(WhiteLabel);

@end
