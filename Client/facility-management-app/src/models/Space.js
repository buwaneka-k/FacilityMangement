class Space{
  constructor(s){
    this.spaceId = s ? s.SpaceID : null;
    this.spaceName = s ? s.SpaceName : null;
    this.facilityID = s ? s.FacilityID : null;
    this.facilityName = s ? s.FacilityName : null;
    this.typeID = s && s.Type? s.Type.TypeID : null;
    this.typeName = s && s.Type? s.Type.TypeName : null;
    this.area = s ? s.Capacity : null;
  }
}

export default Space;