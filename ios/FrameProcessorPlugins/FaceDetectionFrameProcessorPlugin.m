//
//  FaceDetectionFrameProcessorPlugin.m
//  TrueViewCamera
//

#import <Foundation/Foundation.h>
#import <VisionCamera/FrameProcessorPlugin.h>
#import <VisionCamera/FrameProcessorPluginRegistry.h>

@interface FaceDetectionFrameProcessorPlugin : FrameProcessorPlugin
@end

VISION_EXPORT_FRAME_PROCESSOR(FaceDetectionFrameProcessorPlugin, detectFaces)
